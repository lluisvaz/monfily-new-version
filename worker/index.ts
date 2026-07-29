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
 * Single Worker entrypoint:
 *  - `/api/whatsapp-number` resolves the country-aware contact number
 *  - everything else is served from the static SPA build
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const apiEnv = env as unknown as ApiEnv;

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

    return env.ASSETS.fetch(request);
  },
};
