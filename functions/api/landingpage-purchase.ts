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

type CustomerCopy = {
  subject: string;
  preview: string;
  greeting: string;
  body: string;
  assetRequest: string;
  footer: string;
  whatsapp: string;
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

const CUSTOMER_COPY_BY_MARKET: Record<MarketKey, CustomerCopy> = {
  BR: {
    subject: "Sua página está sendo preparada - Monfily",
    preview: "Em até 24 horas você recebe uma versão pronta para visualizar e sugerir melhorias.",
    greeting: "Olá!",
    body: "Sua página está sendo preparada com foco em apresentar seu negócio de forma clara, profissional e pronta para gerar mais oportunidades.",
    assetRequest: "Em até 24 horas vamos enviar uma versão pronta para visualização e sugestões de melhoria. Se quiser ajudar a deixar o resultado ainda mais fiel ao seu negócio, pode nos enviar sua logo, fotos, vídeos, referências visuais e qualquer material que represente sua marca.",
    footer: "Monfily Digital. Todos os direitos reservados.",
    whatsapp: "Olá! Sua página já está em preparação. Em até 24 horas vamos enviar uma versão pronta para você visualizar e sugerir melhorias. Se quiser ajudar, pode mandar sua logo, fotos, vídeos, referências e materiais do seu negócio por aqui.",
  },
  PT: {
    subject: "A sua página está a ser preparada - Monfily",
    preview: "Em até 24 horas recebe uma versão pronta para visualizar e sugerir melhorias.",
    greeting: "Olá!",
    body: "A sua página está a ser preparada com foco em apresentar o seu negócio de forma clara, profissional e pronta para gerar mais oportunidades.",
    assetRequest: "Em até 24 horas vamos enviar uma versão pronta para visualização e sugestões de melhoria. Se quiser ajudar a deixar o resultado ainda mais fiel ao seu negócio, pode enviar a sua logo, fotos, vídeos, referências visuais e qualquer material que represente a sua marca.",
    footer: "Monfily Digital. Todos os direitos reservados.",
    whatsapp: "Olá! A sua página já está a ser preparada. Em até 24 horas vamos enviar uma versão pronta para visualizar e sugerir melhorias. Se quiser ajudar, pode enviar a sua logo, fotos, vídeos, referências e materiais do seu negócio por aqui.",
  },
  ES: {
    subject: "Tu página está en preparación - Monfily",
    preview: "En hasta 24 horas recibirás una versión lista para revisar y sugerir mejoras.",
    greeting: "¡Hola!",
    body: "Tu página está en preparación para presentar tu negocio de forma clara, profesional y lista para generar más oportunidades.",
    assetRequest: "En hasta 24 horas enviaremos una versión lista para que puedas revisarla y sugerir mejoras. Si quieres ayudar a que el resultado represente mejor tu negocio, puedes enviarnos tu logo, fotos, vídeos, referencias visuales y cualquier material de tu marca.",
    footer: "Monfily Digital. Todos los derechos reservados.",
    whatsapp: "¡Hola! Tu página ya está en preparación. En hasta 24 horas enviaremos una versión lista para que puedas revisarla y sugerir mejoras. Si quieres ayudar, puedes enviar tu logo, fotos, vídeos, referencias y materiales de tu negocio por aquí.",
  },
  IT: {
    subject: "La tua pagina è in preparazione - Monfily",
    preview: "Entro 24 ore riceverai una versione pronta da visualizzare e migliorare.",
    greeting: "Ciao!",
    body: "La tua pagina è in preparazione per presentare la tua attività in modo chiaro, professionale e pronto a generare più opportunità.",
    assetRequest: "Entro 24 ore invieremo una versione pronta da visualizzare e su cui suggerire miglioramenti. Se vuoi aiutarci a rendere il risultato più fedele alla tua attività, puoi inviarci logo, foto, video, riferimenti visivi e qualsiasi materiale del brand.",
    footer: "Monfily Digital. Tutti i diritti riservati.",
    whatsapp: "Ciao! La tua pagina è già in preparazione. Entro 24 ore invieremo una versione pronta da visualizzare e su cui suggerire miglioramenti. Se vuoi aiutarci, puoi inviare logo, foto, video, riferimenti e materiali della tua attività qui.",
  },
  IL: {
    subject: "Your page is being prepared - Monfily",
    preview: "Within 24 hours you will receive a ready version to review and suggest improvements.",
    greeting: "Hello!",
    body: "Your page is being prepared to present your business clearly, professionally, and in a way that can generate more opportunities.",
    assetRequest: "Within 24 hours we will send a ready version for review and improvement suggestions. If you want to help us make it closer to your brand, you can send your logo, photos, videos, visual references, and any business materials.",
    footer: "Monfily Digital. All rights reserved.",
    whatsapp: "Hello! Your page is already being prepared. Within 24 hours we will send a ready version for you to review and suggest improvements. If you want to help, you can send your logo, photos, videos, references, and business materials here.",
  },
  SG: {
    subject: "Your page is being prepared - Monfily",
    preview: "Within 24 hours you will receive a ready version to review and suggest improvements.",
    greeting: "Hello!",
    body: "Your page is being prepared to present your business clearly, professionally, and in a way that can generate more opportunities.",
    assetRequest: "Within 24 hours we will send a ready version for review and improvement suggestions. If you want to help us make it closer to your brand, you can send your logo, photos, videos, visual references, and any business materials.",
    footer: "Monfily Digital. All rights reserved.",
    whatsapp: "Hello! Your page is already being prepared. Within 24 hours we will send a ready version for you to review and suggest improvements. If you want to help, you can send your logo, photos, videos, references, and business materials here.",
  },
  GB: {
    subject: "Your page is being prepared - Monfily",
    preview: "Within 24 hours you will receive a ready version to review and suggest improvements.",
    greeting: "Hello!",
    body: "Your page is being prepared to present your business clearly, professionally, and in a way that can generate more opportunities.",
    assetRequest: "Within 24 hours we will send a ready version for review and improvement suggestions. If you want to help us make it closer to your brand, you can send your logo, photos, videos, visual references, and any business materials.",
    footer: "Monfily Digital. All rights reserved.",
    whatsapp: "Hello! Your page is already being prepared. Within 24 hours we will send a ready version for you to review and suggest improvements. If you want to help, you can send your logo, photos, videos, references, and business materials here.",
  },
  US: {
    subject: "Your page is being prepared - Monfily",
    preview: "Within 24 hours you will receive a ready version to review and suggest improvements.",
    greeting: "Hello!",
    body: "Your page is being prepared to present your business clearly, professionally, and in a way that can generate more opportunities.",
    assetRequest: "Within 24 hours we will send a ready version for review and improvement suggestions. If you want to help us make it closer to your brand, you can send your logo, photos, videos, visual references, and any business materials.",
    footer: "Monfily Digital. All rights reserved.",
    whatsapp: "Hello! Your page is already being prepared. Within 24 hours we will send a ready version for you to review and suggest improvements. If you want to help, you can send your logo, photos, videos, references, and business materials here.",
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

function getCustomerEmailHtml(locale: string, copy: CustomerCopy) {
  return `<!doctype html>
<html lang="${escapeHtml(locale)}">
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
                <h1 style="margin:0 0 18px;font-size:26px;line-height:1.1;color:#1C1C1E;">${escapeHtml(copy.greeting)}</h1>
                <p style="margin:0 0 26px;font-size:16px;line-height:1.6;color:#374151;">${escapeHtml(copy.body)}</p>
                <p style="margin:0;font-size:16px;line-height:1.6;color:#374151;">${escapeHtml(copy.assetRequest)}</p>
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

async function sendCustomerEmail(env: Env, data: LandingPurchaseData, copy: CustomerCopy) {
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
      html: getCustomerEmailHtml(data.locale, copy),
      text: `${copy.greeting}\n\n${copy.body}\n\n${copy.assetRequest}`,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${errorText}`);
  }

  return response.json();
}

function getLeadReportText(data: LandingPurchaseData, purchase: { value: number; currency: string }) {
  return [
    "Novo lead Monfily - Landing page",
    "",
    `Mercado: ${data.marketKey}`,
    `Oferta: ${purchase.value} ${purchase.currency}`,
    `Resposta: ${data.selectedOption}`,
    `Nome: ${data.name}`,
    `Negócio: ${data.company}`,
    `Email: ${data.email}`,
    `Instagram: https://instagram.com/${data.instagram}`,
    `Telefone: ${data.phone}`,
  ].join("\n");
}

function getLeadReportEmailHtml(data: LandingPurchaseData, purchase: { value: number; currency: string }) {
  const rows = [
    ["Mercado", data.marketKey],
    ["Oferta", `${purchase.value} ${purchase.currency}`],
    ["Resposta", data.selectedOption],
    ["Nome", data.name],
    ["Negócio", data.company],
    ["Email", data.email],
    ["Instagram", `https://instagram.com/${data.instagram}`],
    ["Telefone", data.phone],
  ];

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo lead Monfily</title>
  </head>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#1C1C1E;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #E2E7F1;">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid #E2E7F1;">
                <div style="font-size:22px;font-weight:700;color:#2869D6;">Novo lead Monfily</div>
                <div style="margin-top:8px;font-size:14px;color:#6B7280;">Respostas registradas no formulário de landing page.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  ${rows
                    .map(
                      ([label, value]) => `<tr>
                    <td style="width:145px;padding:10px 12px;border-bottom:1px solid #E2E7F1;font-size:13px;font-weight:700;color:#1C1C1E;">${escapeHtml(label)}</td>
                    <td style="padding:10px 12px;border-bottom:1px solid #E2E7F1;font-size:14px;color:#374151;">${escapeHtml(value)}</td>
                  </tr>`
                    )
                    .join("")}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function sendLeadReportEmail(
  env: Env,
  data: LandingPurchaseData,
  purchase: { value: number; currency: string }
) {
  const apiKey = env.RESEND_API_KEY;
  const fromEmail = env.RESEND_FROM_EMAIL || "notification@monfily.com";
  const fromName = env.RESEND_FROM_NAME || "Monfily";
  const reportEmail = env.LEAD_REPORT_EMAIL || "lipevaz.lfv@gmail.com";

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
      to: [reportEmail],
      subject: `Novo lead Monfily - ${data.marketKey}`,
      html: getLeadReportEmailHtml(data, purchase),
      text: getLeadReportText(data, purchase),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend report email failed: ${response.status} ${errorText}`);
  }

  return response.json();
}

function resolveReportSenderMarket(value?: string): MarketKey {
  const upper = value?.toUpperCase();
  return upper && upper in PURCHASE_BY_MARKET ? (upper as MarketKey) : "PT";
}

async function sendLeadReportWhatsapp(
  env: Env,
  data: LandingPurchaseData,
  purchase: { value: number; currency: string }
) {
  const to = normalizePhoneForWhatsapp(env.LEAD_REPORT_WHATSAPP_NUMBER || "5511945645232");
  const senderMarket = resolveReportSenderMarket(env.LEAD_REPORT_WHATSAPP_SENDER_MARKET);
  const delivery = getEvolutionDelivery(env, senderMarket);
  const apiUrl = delivery.apiUrl.replace(/\/+$/, "");

  if (!to) {
    throw new Error("Missing LEAD_REPORT_WHATSAPP_NUMBER");
  }

  const response = await fetch(`${apiUrl}/message/sendText/${encodeURIComponent(delivery.instanceName)}`, {
    method: "POST",
    headers: {
      apikey: delivery.apiKey,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      number: to,
      text: getLeadReportText(data, purchase),
      delay: delivery.delayMs,
      linkPreview: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Evolution report WhatsApp failed: ${response.status} ${errorText}`);
  }

  return response.json().catch(() => ({ ok: true }));
}

async function postWhatsappReminder(env: Env, data: LandingPurchaseData, copy: CustomerCopy, eventId: string) {
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
          message: copy.whatsapp,
        },
        reminder: {
          kind: "landingpage_purchase_delivery_notice",
          message: copy.whatsapp,
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
  const copy = CUSTOMER_COPY_BY_MARKET[data.marketKey] || CUSTOMER_COPY_BY_MARKET.US;
  const purchase = PURCHASE_BY_MARKET[data.marketKey];
  const eventId = `landingpage_purchase_${Date.now()}_${crypto.randomUUID()}`;

  try {
    const [emailResult, whatsappResult, reportEmailResult, reportWhatsappResult] = await Promise.all([
      sendCustomerEmail(env, data, copy),
      postWhatsappReminder(env, data, copy, eventId),
      sendLeadReportEmail(env, data, purchase),
      sendLeadReportWhatsapp(env, data, purchase),
    ]);

    return jsonResponse({
      ok: true,
      eventId,
      email: { sent: true, provider: emailResult },
      whatsapp: { scheduled: true, provider: whatsappResult },
      report: {
        email: { sent: true, provider: reportEmailResult },
        whatsapp: { sent: true, provider: reportWhatsappResult },
      },
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
