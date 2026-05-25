import { handleLandingPurchase, corsHeaders as purchaseCors } from "../functions/api/landingpage-purchase";
import { corsHeaders as whatsappCors, handleWhatsappNumber } from "../functions/api/whatsapp-number";

interface Env {
  /** Static assets binding (the built `dist` directory). */
  ASSETS: { fetch(request: Request): Promise<Response> };
  [key: string]: unknown;
}

type ApiEnv = Record<string, string | undefined>;

function preflight(headers: HeadersInit): Response {
  return new Response(null, { status: 204, headers });
}

/**
 * Single Worker entrypoint for the full-stack app:
 *  - `/api/*`  -> handled here (email, WhatsApp reminder, country number)
 *  - anything else -> static assets from `dist` (with SPA fallback to index.html)
 */
export default {
  async fetch(request: Request, env: Env, ctx: { waitUntil: (promise: Promise<unknown>) => void }): Promise<Response> {
    const url = new URL(request.url);
    const apiEnv = env as unknown as ApiEnv;

    if (url.pathname === "/api/landingpage-purchase") {
      if (request.method === "OPTIONS") return preflight(purchaseCors);
      if (request.method === "POST") return handleLandingPurchase(request, apiEnv, ctx);
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
