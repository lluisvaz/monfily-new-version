import { z } from "zod";

type PagesFunctionContext<Env extends Record<string, string | undefined>> = {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
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
  domainAnswer: z.string().optional(),
  logoAnswer: z.string().optional(),
  budgetAnswer: z.string().optional(),
  timelineAnswer: z.string().optional(),
  focusAnswers: z.array(z.string()).optional(),
  currentSiteUrl: z.string().optional(),
  name: z.string().min(1),
  company: z.string().min(1),
  email: z.string().email(),
  instagram: z.string().min(1).max(30).regex(/^[A-Za-z0-9._]+$/),
  phone: z.string().min(1),
  pageUrl: z.string().url().optional(),
});

export type LandingPurchaseData = z.infer<typeof landingPurchaseSchema>;

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
    preview: "Em até 72 horas você recebe uma versão pronta para visualizar e sugerir melhorias.",
    greeting: "Olá!",
    body: "Sua página está sendo preparada com foco em apresentar seu negócio de forma clara, profissional e pronta para gerar mais oportunidades.",
    assetRequest: "Em até 72 horas vamos enviar uma versão pronta para visualização e sugestões de melhoria. Se quiser ajudar a deixar o resultado ainda mais fiel ao seu negócio, pode nos enviar sua logo, fotos, vídeos, referências visuais e qualquer material que represente sua marca.",
    footer: "Monfily Digital. Todos os direitos reservados.",
    whatsapp: "Olá! Sua página já está em preparação. Em até 72 horas vamos enviar uma versão pronta para você visualizar e sugerir melhorias. Se quiser ajudar, pode mandar sua logo, fotos, vídeos, referências e materiais do seu negócio por aqui.",
  },
  PT: {
    subject: "A sua página está a ser preparada - Monfily",
    preview: "Em até 72 horas recebe uma versão pronta para visualizar e sugerir melhorias.",
    greeting: "Olá!",
    body: "A sua página está a ser preparada com foco em apresentar o seu negócio de forma clara, profissional e pronta para gerar mais oportunidades.",
    assetRequest: "Em até 72 horas vamos enviar uma versão pronta para visualização e sugestões de melhoria. Se quiser ajudar a deixar o resultado ainda mais fiel ao seu negócio, pode enviar a sua logo, fotos, vídeos, referências visuais e qualquer material que represente a sua marca.",
    footer: "Monfily Digital. Todos os direitos reservados.",
    whatsapp: "Olá! A sua página já está a ser preparada. Em até 72 horas vamos enviar uma versão pronta para visualizar e sugerir melhorias. Se quiser ajudar, pode enviar a sua logo, fotos, vídeos, referências e materiais do seu negócio por aqui.",
  },
  ES: {
    subject: "Tu página está en preparación - Monfily",
    preview: "En hasta 72 horas recibirás una versión lista para revisar y sugerir mejoras.",
    greeting: "¡Hola!",
    body: "Tu página está en preparación para presentar tu negocio de forma clara, profesional y lista para generar más oportunidades.",
    assetRequest: "En hasta 72 horas enviaremos una versión lista para que puedas revisarla y sugerir mejoras. Si quieres ayudar a que el resultado represente mejor tu negocio, puedes enviarnos tu logo, fotos, vídeos, referencias visuales y cualquier material de tu marca.",
    footer: "Monfily Digital. Todos los derechos reservados.",
    whatsapp: "¡Hola! Tu página ya está en preparación. En hasta 72 horas enviaremos una versión lista para que puedas revisarla y sugerir mejoras. Si quieres ayudar, puedes enviar tu logo, fotos, vídeos, referencias y materiales de tu negocio por aquí.",
  },
  IT: {
    subject: "La tua pagina è in preparazione - Monfily",
    preview: "Entro 72 ore riceverai una versione pronta da visualizzare e migliorare.",
    greeting: "Ciao!",
    body: "La tua pagina è in preparazione per presentare la tua attività in modo chiaro, professionale e pronto a generare più opportunità.",
    assetRequest: "Entro 72 ore invieremo una versione pronta da visualizzare e su cui suggerire miglioramenti. Se vuoi aiutarci a rendere il risultato più fedele alla tua attività, puoi inviarci logo, foto, video, riferimenti visivi e qualsiasi materiale del brand.",
    footer: "Monfily Digital. Tutti i diritti riservati.",
    whatsapp: "Ciao! La tua pagina è già in preparazione. Entro 72 ore invieremo una versione pronta da visualizzare e su cui suggerire miglioramenti. Se vuoi aiutarci, puoi inviare logo, foto, video, riferimenti e materiali della tua attività qui.",
  },
  IL: {
    subject: "Your page is being prepared - Monfily",
    preview: "Within 72 hours you will receive a ready version to review and suggest improvements.",
    greeting: "Hello!",
    body: "Your page is being prepared to present your business clearly, professionally, and in a way that can generate more opportunities.",
    assetRequest: "Within 72 hours we will send a ready version for review and improvement suggestions. If you want to help us make it closer to your brand, you can send your logo, photos, videos, visual references, and any business materials.",
    footer: "Monfily Digital. All rights reserved.",
    whatsapp: "Hello! Your page is already being prepared. Within 72 hours we will send a ready version for you to review and suggest improvements. If you want to help, you can send your logo, photos, videos, references, and business materials here.",
  },
  SG: {
    subject: "Your page is being prepared - Monfily",
    preview: "Within 72 hours you will receive a ready version to review and suggest improvements.",
    greeting: "Hello!",
    body: "Your page is being prepared to present your business clearly, professionally, and in a way that can generate more opportunities.",
    assetRequest: "Within 72 hours we will send a ready version for review and improvement suggestions. If you want to help us make it closer to your brand, you can send your logo, photos, videos, visual references, and any business materials.",
    footer: "Monfily Digital. All rights reserved.",
    whatsapp: "Hello! Your page is already being prepared. Within 72 hours we will send a ready version for you to review and suggest improvements. If you want to help, you can send your logo, photos, videos, references, and business materials here.",
  },
  GB: {
    subject: "Your page is being prepared - Monfily",
    preview: "Within 72 hours you will receive a ready version to review and suggest improvements.",
    greeting: "Hello!",
    body: "Your page is being prepared to present your business clearly, professionally, and in a way that can generate more opportunities.",
    assetRequest: "Within 72 hours we will send a ready version for review and improvement suggestions. If you want to help us make it closer to your brand, you can send your logo, photos, videos, visual references, and any business materials.",
    footer: "Monfily Digital. All rights reserved.",
    whatsapp: "Hello! Your page is already being prepared. Within 72 hours we will send a ready version for you to review and suggest improvements. If you want to help, you can send your logo, photos, videos, references, and business materials here.",
  },
  US: {
    subject: "Your page is being prepared - Monfily",
    preview: "Within 72 hours you will receive a ready version to review and suggest improvements.",
    greeting: "Hello!",
    body: "Your page is being prepared to present your business clearly, professionally, and in a way that can generate more opportunities.",
    assetRequest: "Within 72 hours we will send a ready version for review and improvement suggestions. If you want to help us make it closer to your brand, you can send your logo, photos, videos, visual references, and any business materials.",
    footer: "Monfily Digital. All rights reserved.",
    whatsapp: "Hello! Your page is already being prepared. Within 72 hours we will send a ready version for you to review and suggest improvements. If you want to help, you can send your logo, photos, videos, references, and business materials here.",
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

function removeUndefined<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== "")) as Partial<T>;
}

function getMetaEnvPrefixes(marketKey: MarketKey) {
  return marketKey === "GB" ? ["GB", "UK"] : [marketKey];
}

function getMetaPixelConfig(env: Env, marketKey: MarketKey) {
  for (const prefix of getMetaEnvPrefixes(marketKey)) {
    const pixelId = env[`META_PIXEL_${prefix}_ID`] || env[`VITE_META_PIXEL_${prefix}_IDS`]?.split(/[,\s]+/)[0];
    const accessToken = env[`META_PIXEL_${prefix}_ACCESS_TOKEN`];

    if (pixelId && accessToken) {
      return {
        pixelId,
        accessToken,
        graphVersion: env.META_PIXEL_GRAPH_VERSION || "v21.0",
      };
    }
  }

  return null;
}

async function sha256(value?: string) {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return undefined;

  const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalized));
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getCookie(request: Request, name: string) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${name}=`));

  if (!match) return undefined;

  try {
    return decodeURIComponent(match.slice(name.length + 1));
  } catch {
    return match.slice(name.length + 1);
  }
}

function getClientIp(request: Request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    undefined
  );
}

function getEventSourceUrl(request: Request, data: LandingPurchaseData) {
  return data.pageUrl || request.headers.get("Referer") || request.url;
}

function getFbc(request: Request, eventSourceUrl: string) {
  const fbc = getCookie(request, "_fbc");
  if (fbc) return fbc;

  try {
    const fbclid = new URL(eventSourceUrl).searchParams.get("fbclid");
    return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
  } catch {
    return undefined;
  }
}

async function sendMetaLeadEvent(
  request: Request,
  env: Env,
  data: LandingPurchaseData,
  purchase: { value: number; currency: string },
  eventId: string
) {
  const config = getMetaPixelConfig(env, data.marketKey);
  if (!config) {
    return { skipped: true, reason: "Meta pixel ID or access token is not configured for this market" };
  }

  const eventSourceUrl = getEventSourceUrl(request, data);
  const firstName = data.name.trim().split(/\s+/)[0];
  const hashedEmail = await sha256(data.email);
  const hashedPhone = await sha256(normalizePhoneForWhatsapp(data.phone));
  const hashedFirstName = await sha256(firstName);
  const userData = removeUndefined({
    em: hashedEmail ? [hashedEmail] : undefined,
    ph: hashedPhone ? [hashedPhone] : undefined,
    fn: hashedFirstName ? [hashedFirstName] : undefined,
    client_ip_address: getClientIp(request),
    client_user_agent: request.headers.get("User-Agent") || undefined,
    fbp: getCookie(request, "_fbp"),
    fbc: getFbc(request, eventSourceUrl),
  });

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: eventSourceUrl,
        user_data: userData,
        custom_data: {
          content_name: "Monfily landing page WhatsApp lead",
          content_category: "landing_page",
          lead_type: "whatsapp_form_submit",
          value: purchase.value,
          currency: purchase.currency,
        },
      },
    ],
  };

  if (env.META_PIXEL_TEST_EVENT_CODE) {
    payload.test_event_code = env.META_PIXEL_TEST_EVENT_CODE;
  }

  try {
    const response = await fetch(`https://graph.facebook.com/${config.graphVersion}/${config.pixelId}/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const provider = await response.json().catch(async () => ({ text: await response.text().catch(() => "") }));

    if (!response.ok) {
      console.error("Meta Conversions API lead failed:", provider);
      return { sent: false, provider };
    }

    return { sent: true, provider };
  } catch (error) {
    console.error("Meta Conversions API lead failed:", error);
    return { sent: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
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
  const lines = [
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
  ];
  if (data.currentSiteUrl) lines.push(`Site atual: ${data.currentSiteUrl}`);
  if (data.domainAnswer) lines.push(`Domínio: ${data.domainAnswer}`);
  if (data.logoAnswer) lines.push(`Logo: ${data.logoAnswer}`);
  if (data.budgetAnswer) lines.push(`Orçamento: ${data.budgetAnswer}`);
  if (data.timelineAnswer) lines.push(`Prazo: ${data.timelineAnswer}`);
  if (data.focusAnswers?.length) lines.push(`Foco do site: ${data.focusAnswers.join(", ")}`);
  return lines.join("\n");
}

function getLeadReportEmailHtml(data: LandingPurchaseData, purchase: { value: number; currency: string }) {
  const rows: [string, string][] = [
    ["Mercado", data.marketKey],
    ["Oferta", `${purchase.value} ${purchase.currency}`],
    ["Resposta", data.selectedOption],
    ["Nome", data.name],
    ["Negócio", data.company],
    ["Email", data.email],
    ["Instagram", `https://instagram.com/${data.instagram}`],
    ["Telefone", data.phone],
  ];
  if (data.currentSiteUrl) rows.push(["Site atual", data.currentSiteUrl]);
  if (data.domainAnswer) rows.push(["Domínio", data.domainAnswer]);
  if (data.logoAnswer) rows.push(["Logo", data.logoAnswer]);
  if (data.budgetAnswer) rows.push(["Orçamento", data.budgetAnswer]);
  if (data.timelineAnswer) rows.push(["Prazo", data.timelineAnswer]);
  if (data.focusAnswers?.length) rows.push(["Foco do site", data.focusAnswers.join(", ")]);

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

// Sends the delivery-notice WhatsApp directly to the customer via Evolution API,
// using the same proven path as the lead report. Called from the Durable Object
// alarm 5 minutes after the form is submitted.
export async function sendCustomerWhatsapp(env: Env, data: LandingPurchaseData) {
  const copy = CUSTOMER_COPY_BY_MARKET[data.marketKey] || CUSTOMER_COPY_BY_MARKET.US;
  const to = normalizePhoneForWhatsapp(data.phone);
  if (!to) {
    throw new Error("Missing customer phone number");
  }

  const delivery = getEvolutionDelivery(env, data.marketKey);
  const apiUrl = delivery.apiUrl.replace(/\/+$/, "");

  const response = await fetch(`${apiUrl}/message/sendText/${encodeURIComponent(delivery.instanceName)}`, {
    method: "POST",
    headers: {
      apikey: delivery.apiKey,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      number: to,
      text: copy.whatsapp,
      delay: delivery.delayMs,
      linkPreview: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Evolution customer WhatsApp failed: ${response.status} ${errorText}`);
  }

  return response.json().catch(() => ({ ok: true }));
}

export const onRequestOptions: PagesFunction<Env> = () => new Response(null, { status: 204, headers: corsHeaders });

// Minimal shape of a Durable Object namespace binding used to schedule the
// delayed customer WhatsApp. The concrete implementation lives in worker/index.ts.
type ReminderSchedulerNamespace = {
  idFromName(name: string): unknown;
  get(id: unknown): { fetch(input: string, init?: RequestInit): Promise<Response> };
};

export async function handleLandingPurchase(
  request: Request,
  env: Env,
  scheduler?: ReminderSchedulerNamespace
): Promise<Response> {
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
  const eventId = `landingpage_lead_${Date.now()}_${crypto.randomUUID()}`;

  const [emailResult, reportEmailResult, reportWhatsappResult, metaResult] = await Promise.allSettled([
    sendCustomerEmail(env, data, copy),
    sendLeadReportEmail(env, data, purchase),
    sendLeadReportWhatsapp(env, data, purchase),
    sendMetaLeadEvent(request, env, data, purchase, eventId),
  ]);

  if (emailResult.status === "rejected") console.error("Customer email failed:", emailResult.reason);
  if (reportEmailResult.status === "rejected") console.error("Report email failed:", reportEmailResult.reason);
  if (reportWhatsappResult.status === "rejected") console.error("Report WhatsApp failed:", reportWhatsappResult.reason);
  if (metaResult.status === "rejected") console.error("Meta event failed:", metaResult.reason);

  // Schedule the customer WhatsApp for 5 minutes later via a Durable Object alarm.
  let whatsappScheduled = false;
  if (scheduler) {
    try {
      const id = scheduler.idFromName(eventId);
      const stub = scheduler.get(id);
      const scheduleResponse = await stub.fetch("https://scheduler.internal/schedule", {
        method: "POST",
        body: JSON.stringify({ data }),
      });
      whatsappScheduled = scheduleResponse.ok;
    } catch (error) {
      console.error("Failed to schedule customer WhatsApp:", error);
    }
  } else {
    console.error("Reminder scheduler binding unavailable; customer WhatsApp not scheduled");
  }

  return jsonResponse({
    ok: true,
    eventId,
    email: { sent: emailResult.status === "fulfilled" },
    whatsapp: { scheduled: whatsappScheduled },
    report: {
      email: { sent: reportEmailResult.status === "fulfilled" },
      whatsapp: { sent: reportWhatsappResult.status === "fulfilled" },
    },
    meta: metaResult.status === "fulfilled" ? metaResult.value : null,
    purchase,
  });
}

export const onRequestPost: PagesFunction<Env> = (ctx) => handleLandingPurchase(ctx.request, ctx.env);
