import { z } from "zod";

type PagesFunctionContext<Env extends Record<string, string | undefined>> = {
  request: Request;
  env: Env;
};

type PagesFunction<Env extends Record<string, string | undefined>> = (
  context: PagesFunctionContext<Env>
) => Response | Promise<Response>;

type Env = Record<string, string | undefined>;

const marketSchema = z.enum(["PT", "IT", "ES", "IL", "SG", "BR", "GB", "US"]);
type MarketKey = z.infer<typeof marketSchema>;

const landingPurchaseSchema = z.object({
  marketKey: marketSchema,
  locale: z.string().min(2),
  selectedOption: z.string().min(1),
  name: z.string().min(1),
  company: z.string().min(1),
  email: z.string().email(),
  instagram: z.string().min(1).max(30).regex(/^[A-Za-z0-9._]+$/),
  phone: z.string().min(1),
});

type LandingPurchaseData = z.infer<typeof landingPurchaseSchema>;

type MessageCopy = {
  subject: string;
  preview: string;
  greeting: (name: string) => string;
  companyLabel: string;
  instagramLabel: string;
  body: string;
  footer: string;
  whatsapp: (name: string) => string;
};

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const PURCHASE_BY_MARKET: Record<MarketKey, { value: number; currency: string; envPrefix: string }> = {
  BR: { value: 697, currency: "BRL", envPrefix: "BR" },
  PT: { value: 397, currency: "EUR", envPrefix: "PT" },
  ES: { value: 597, currency: "EUR", envPrefix: "ES" },
  IT: { value: 397, currency: "EUR", envPrefix: "IT" },
  IL: { value: 1700, currency: "ILS", envPrefix: "IL" },
  SG: { value: 1100, currency: "SGD", envPrefix: "SG" },
  GB: { value: 697, currency: "GBP", envPrefix: "UK" },
  US: { value: 497, currency: "USD", envPrefix: "US" },
};

const COPY_BY_MARKET: Record<MarketKey, MessageCopy> = {
  BR: {
    subject: "Recebemos suas informações - Monfily",
    preview: "Vamos entregar o link da sua página pronta dentro de 24 horas.",
    greeting: (name) => `Olá, ${name}!`,
    companyLabel: "Negócio",
    instagramLabel: "Instagram",
    body: "Recebemos as informações e iremos entregar o link da página pronta dentro de 24 horas.",
    footer: "Monfily Digital. Todos os direitos reservados.",
    whatsapp: (name) => `Olá, ${name}! Recebemos as informações e iremos entregar o link da página pronta dentro de 24 horas.`,
  },
  PT: {
    subject: "Recebemos as suas informações - Monfily",
    preview: "Vamos entregar o link da sua página pronta dentro de 24 horas.",
    greeting: (name) => `Olá, ${name}!`,
    companyLabel: "Negócio",
    instagramLabel: "Instagram",
    body: "Recebemos as suas informações e iremos entregar o link da página pronta dentro de 24 horas.",
    footer: "Monfily Digital. Todos os direitos reservados.",
    whatsapp: (name) => `Olá, ${name}! Recebemos as suas informações e iremos entregar o link da página pronta dentro de 24 horas.`,
  },
  ES: {
    subject: "Hemos recibido tu información - Monfily",
    preview: "Entregaremos el enlace de tu página lista en 24 horas.",
    greeting: (name) => `¡Hola, ${name}!`,
    companyLabel: "Negocio",
    instagramLabel: "Instagram",
    body: "Hemos recibido tu información y entregaremos el enlace de tu página lista en un plazo de 24 horas.",
    footer: "Monfily Digital. Todos los derechos reservados.",
    whatsapp: (name) => `¡Hola, ${name}! Hemos recibido tu información y entregaremos el enlace de tu página lista en un plazo de 24 horas.`,
  },
  IT: {
    subject: "Abbiamo ricevuto le tue informazioni - Monfily",
    preview: "Consegneremo il link della tua pagina pronta entro 24 ore.",
    greeting: (name) => `Ciao, ${name}!`,
    companyLabel: "Attività",
    instagramLabel: "Instagram",
    body: "Abbiamo ricevuto le tue informazioni e consegneremo il link della pagina pronta entro 24 ore.",
    footer: "Monfily Digital. Tutti i diritti riservati.",
    whatsapp: (name) => `Ciao, ${name}! Abbiamo ricevuto le tue informazioni e consegneremo il link della pagina pronta entro 24 ore.`,
  },
  IL: {
    subject: "קיבלנו את הפרטים שלך - Monfily",
    preview: "נשלח את הקישור לעמוד המוכן בתוך 24 שעות.",
    greeting: (name) => `שלום, ${name}!`,
    companyLabel: "העסק",
    instagramLabel: "אינסטגרם",
    body: "קיבלנו את הפרטים שלך ונשלח את הקישור לעמוד המוכן בתוך 24 שעות.",
    footer: "Monfily Digital. כל הזכויות שמורות.",
    whatsapp: (name) => `שלום, ${name}! קיבלנו את הפרטים שלך ונשלח את הקישור לעמוד המוכן בתוך 24 שעות.`,
  },
  SG: {
    subject: "We received your information - Monfily",
    preview: "We will deliver the ready page link within 24 hours.",
    greeting: (name) => `Hello, ${name}!`,
    companyLabel: "Business",
    instagramLabel: "Instagram",
    body: "We received your information and will deliver the ready page link within 24 hours.",
    footer: "Monfily Digital. All rights reserved.",
    whatsapp: (name) => `Hello, ${name}! We received your information and will deliver the ready page link within 24 hours.`,
  },
  GB: {
    subject: "We received your information - Monfily",
    preview: "We will deliver the ready page link within 24 hours.",
    greeting: (name) => `Hello, ${name}!`,
    companyLabel: "Business",
    instagramLabel: "Instagram",
    body: "We received your information and will deliver the ready page link within 24 hours.",
    footer: "Monfily Digital. All rights reserved.",
    whatsapp: (name) => `Hello, ${name}! We received your information and will deliver the ready page link within 24 hours.`,
  },
  US: {
    subject: "We received your information - Monfily",
    preview: "We will deliver the ready page link within 24 hours.",
    greeting: (name) => `Hello, ${name}!`,
    companyLabel: "Business",
    instagramLabel: "Instagram",
    body: "We received your information and will deliver the ready page link within 24 hours.",
    footer: "Monfily Digital. All rights reserved.",
    whatsapp: (name) => `Hello, ${name}! We received your information and will deliver the ready page link within 24 hours.`,
  },
};

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...init?.headers,
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizePhoneForWhatsapp(value: string) {
  return value.replace(/\D/g, "");
}

function envFlag(env: Env, name: string, fallback = false) {
  const value = env[name];
  if (value == null) return fallback;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function getEvolutionDelivery(env: Env, marketKey: MarketKey) {
  const purchase = PURCHASE_BY_MARKET[marketKey];
  const apiUrl = env.EVOLUTION_API_URL;
  const instanceName = env[`EVOLUTION_${purchase.envPrefix}_INSTANCE_NAME`];
  const instanceToken = env[`EVOLUTION_${purchase.envPrefix}_INSTANCE_TOKEN`];
  const globalApiKey = env.EVOLUTION_API_KEY;
  const requireCountryConfig = envFlag(env, "EVOLUTION_REQUIRE_COUNTRY_CONFIG", true);
  const allowDefaultFallback = envFlag(env, "EVOLUTION_ALLOW_DEFAULT_SENDER_FALLBACK", false);

  if (!apiUrl) {
    throw new Error("Missing EVOLUTION_API_URL");
  }

  if (instanceName && instanceToken) {
    return {
      apiUrl,
      instanceName,
      apiKey: instanceToken,
      delayMs: Number(env.EVOLUTION_SEND_DELAY_MS || "1200"),
    };
  }

  if (requireCountryConfig || !allowDefaultFallback || !globalApiKey) {
    throw new Error(`Missing Evolution instance config for ${marketKey}`);
  }

  return {
    apiUrl,
    instanceName: env.EVOLUTION_DEFAULT_INSTANCE_NAME || "Monfily",
    apiKey: globalApiKey,
    delayMs: Number(env.EVOLUTION_SEND_DELAY_MS || "1200"),
  };
}

function getEmailHtml(data: LandingPurchaseData, copy: MessageCopy) {
  const name = data.name.trim();
  const safeCompany = escapeHtml(data.company.trim());
  const safeInstagram = escapeHtml(data.instagram.trim());

  return `<!doctype html>
<html lang="${escapeHtml(data.locale)}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(copy.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#1C1C1E;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #E2E7F1;">
            <tr>
              <td style="padding:32px 32px 20px;border-bottom:1px solid #E2E7F1;">
                <div style="font-size:24px;font-weight:700;color:#2869D6;">Monfily</div>
                <div style="margin-top:10px;font-size:14px;color:#6B7280;">${escapeHtml(copy.preview)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 18px;font-size:26px;line-height:1.1;color:#1C1C1E;">${escapeHtml(copy.greeting(name))}</h1>
                <p style="margin:0 0 26px;font-size:16px;line-height:1.6;color:#374151;">${escapeHtml(copy.body)}</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #E2E7F1;padding-top:18px;">
                  <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;"><strong style="color:#1C1C1E;">${escapeHtml(copy.companyLabel)}:</strong> ${safeCompany}</td></tr>
                  <tr><td style="padding:6px 0;font-size:14px;color:#6B7280;"><strong style="color:#1C1C1E;">${escapeHtml(copy.instagramLabel)}:</strong> instagram.com/${safeInstagram}</td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px;border-top:1px solid #E2E7F1;background:#FAFBFC;font-size:13px;line-height:1.5;color:#6B7280;text-align:center;">
                ${escapeHtml(copy.footer)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function sendResendEmail(env: Env, data: LandingPurchaseData, copy: MessageCopy) {
  const apiKey = env.RESEND_API_KEY;
  const fromEmail = env.RESEND_FROM_EMAIL || "notification@monfily.com";
  const fromName = env.RESEND_FROM_NAME || "Monfily";

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [data.email],
      subject: copy.subject,
      html: getEmailHtml(data, copy),
      text: `${copy.greeting(data.name)}\n\n${copy.body}`,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${errorText}`);
  }

  return response.json();
}

async function postWhatsappReminder(env: Env, data: LandingPurchaseData, copy: MessageCopy, eventId: string) {
  if (!envFlag(env, "N8N_WHATSAPP_REMINDERS_ENABLED", false)) {
    return { skipped: true };
  }

  const webhookUrl = env.N8N_WHATSAPP_REMINDER_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("Missing N8N_WHATSAPP_REMINDER_WEBHOOK_URL");
  }

  const timeoutMs = Number(env.N8N_WHATSAPP_REMINDER_TIMEOUT_MS || "10000");
  const delayMs = Number(env.N8N_WHATSAPP_REMINDER_DELAY_MS || "480000");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-monfily-webhook-secret": env.N8N_WHATSAPP_REMINDER_WEBHOOK_SECRET || "",
      },
      body: JSON.stringify({
        idempotencyKey: eventId,
        language: data.locale,
        marketKey: data.marketKey,
        to: normalizePhoneForWhatsapp(data.phone),
        variables: {
          name: data.name,
          company: data.company,
          email: data.email,
          instagram: `instagram.com/${data.instagram}`,
          whatsappTo: normalizePhoneForWhatsapp(data.phone),
          message: copy.whatsapp(data.name),
        },
        reminder: {
          kind: "landingpage_purchase_delivery_notice",
          message: copy.whatsapp(data.name),
          delayMs,
          sendAfterSeconds: Math.round(delayMs / 1000),
        },
        delivery: {
          provider: "evolution",
          evolution: getEvolutionDelivery(env, data.marketKey),
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`n8n WhatsApp reminder failed: ${response.status} ${errorText}`);
    }

    return response.json().catch(() => ({ ok: true }));
  } finally {
    clearTimeout(timeout);
  }
}

export const onRequestOptions: PagesFunction<Env> = () => new Response(null, { status: 204, headers: corsHeaders });

export async function handleLandingPurchase(request: Request, env: Env): Promise<Response> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ message: "Invalid JSON payload" }, { status: 400 });
  }

  const result = landingPurchaseSchema.safeParse(body);
  if (!result.success) {
    return jsonResponse({ message: "Invalid landing purchase payload", errors: result.error.errors }, { status: 400 });
  }

  const data = result.data;
  const copy = COPY_BY_MARKET[data.marketKey] || COPY_BY_MARKET.US;
  const purchase = PURCHASE_BY_MARKET[data.marketKey];
  const eventId = `landingpage_purchase_${Date.now()}_${crypto.randomUUID()}`;

  try {
    const [emailResult, whatsappResult] = await Promise.all([
      sendResendEmail(env, data, copy),
      postWhatsappReminder(env, data, copy, eventId),
    ]);

    return jsonResponse({
      ok: true,
      eventId,
      email: { sent: true, provider: emailResult },
      whatsapp: { scheduled: true, provider: whatsappResult },
      purchase,
    });
  } catch (error) {
    console.error("Landing page purchase failed:", error);
    return jsonResponse(
      {
        message: "Failed to process landing page purchase",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export const onRequestPost: PagesFunction<Env> = ({ request, env }) => handleLandingPurchase(request, env);
