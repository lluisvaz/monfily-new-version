export type Env = Record<string, string | undefined>;

type MarketKey = "PT" | "IT" | "ES" | "IL" | "SG" | "BR" | "GB" | "US";

// Market -> EVOLUTION environment prefix (GB uses the UK instance).
const ENV_PREFIX_BY_MARKET: Record<MarketKey, string> = {
  BR: "BR",
  PT: "PT",
  ES: "ES",
  IT: "IT",
  IL: "IL",
  SG: "SG",
  GB: "UK",
  US: "US",
};

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
      ...corsHeaders,
      ...init?.headers,
    },
  });
}

function sanitizeNumber(value?: string): string | null {
  const digits = value?.replace(/\D/g, "") ?? "";
  return digits.length >= 8 ? digits : null;
}

export function handleWhatsappNumber(request: Request, env: Env): Response {
  const market = new URL(request.url).searchParams.get("market")?.toUpperCase();

  if (!market || !(market in ENV_PREFIX_BY_MARKET)) {
    return jsonResponse({ message: "Invalid or missing market" }, { status: 400 });
  }

  const prefix = ENV_PREFIX_BY_MARKET[market as MarketKey];
  const number = sanitizeNumber(env[`EVOLUTION_${prefix}_NUMBER`]);

  return jsonResponse({ market, number });
}
