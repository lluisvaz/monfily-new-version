import {
  handleLandingPurchase,
  corsHeaders as purchaseCors,
  sendCustomerWhatsapp,
  type LandingPurchaseData,
} from "../functions/api/landingpage-purchase";
import { corsHeaders as whatsappCors, handleWhatsappNumber } from "../functions/api/whatsapp-number";

/** Delay (ms) between form submission and the customer WhatsApp delivery notice. */
const CUSTOMER_WHATSAPP_DELAY_MS = 300_000;

type ReminderSchedulerNamespace = {
  idFromName(name: string): unknown;
  get(id: unknown): { fetch(input: string, init?: RequestInit): Promise<Response> };
};

interface Env {
  /** Static assets binding (the built `dist` directory). */
  ASSETS: { fetch(request: Request): Promise<Response> };
  /** Durable Object that fires an alarm to send the delayed customer WhatsApp. */
  WHATSAPP_SCHEDULER: ReminderSchedulerNamespace;
  [key: string]: unknown;
}

type ApiEnv = Record<string, string | undefined>;

/** Minimal Durable Object storage surface (avoids a workers-types dependency). */
type DurableObjectStorage = {
  put(key: string, value: unknown): Promise<void>;
  get<T>(key: string): Promise<T | undefined>;
  delete(key: string): Promise<boolean>;
  setAlarm(scheduledTime: number): Promise<void>;
};
type DurableObjectState = { storage: DurableObjectStorage };

/**
 * Durable Object that reliably delays the customer WhatsApp. The request handler
 * stores the lead payload and sets an alarm 5 minutes out; when the alarm fires,
 * the message is sent via Evolution API. Cloudflare automatically retries the
 * alarm on failure, so a transient Evolution outage will not drop the message.
 */
export class WhatsappScheduler {
  private state: DurableObjectState;
  private env: ApiEnv;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env as unknown as ApiEnv;
  }

  async fetch(request: Request): Promise<Response> {
    const { data } = (await request.json()) as { data: LandingPurchaseData };
    await this.state.storage.put("data", data);
    await this.state.storage.setAlarm(Date.now() + CUSTOMER_WHATSAPP_DELAY_MS);
    return new Response("scheduled");
  }

  async alarm(): Promise<void> {
    const data = await this.state.storage.get<LandingPurchaseData>("data");
    if (!data) return;
    // If this throws, Cloudflare retries the alarm; we only clear state on success.
    await sendCustomerWhatsapp(this.env, data);
    await this.state.storage.delete("data");
  }
}

function preflight(headers: HeadersInit): Response {
  return new Response(null, { status: 204, headers });
}

/**
 * Single Worker entrypoint for the full-stack app:
 *  - `/api/*`  -> handled here (email, WhatsApp reminder, country number)
 *  - anything else -> static assets from `dist` (with SPA fallback to index.html)
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const apiEnv = env as unknown as ApiEnv;

    if (url.pathname === "/api/landingpage-purchase") {
      if (request.method === "OPTIONS") return preflight(purchaseCors);
      if (request.method === "POST") return handleLandingPurchase(request, apiEnv, env.WHATSAPP_SCHEDULER);
      return new Response("Method Not Allowed", { status: 405 });
    }

    if (url.pathname === "/api/whatsapp-number") {
      if (request.method === "OPTIONS") return preflight(whatsappCors);
      if (request.method === "GET") return handleWhatsappNumber(request, apiEnv);
      return new Response("Method Not Allowed", { status: 405 });
    }

    if (url.pathname.startsWith("/api/")) {
      return new Response(JSON.stringify({ message: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Static assets + single-page-application fallback (see wrangler.toml).
    return env.ASSETS.fetch(request);
  },
};
