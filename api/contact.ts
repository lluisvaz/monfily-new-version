import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { z } from "zod";
import { getCurrencyForCountry, getCurrencySymbol, formatCurrency, convertFromBRL } from "../shared/currencies";

// Lead form validation schema
const leadFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
    country: z.string().min(1, "Country is required"),
    company: z.string().min(1, "Company is required"),
    website: z.string().optional().or(z.literal("")),
    services: z.array(z.string()).min(1, "Select at least one service"),
    budget: z.string().min(1, "Budget is required"),
    timeframe: z.string().min(1, "Timeframe is required"),
    message: z.string().min(1, "Message is required"),
    language: z.string().optional().default("pt"),
    detectedCountry: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

function createTransporter() {
    const host = process.env.EMAIL_HOST;
    const port = parseInt(process.env.EMAIL_PORT || "587");
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!host || !user || !pass) {
        console.error("Missing email configuration. Please check your .env file:", { 
            host: host || "MISSING", 
            user: user || "MISSING", 
            pass: pass ? "SET" : "MISSING",
            receiver: process.env.RECEIVER_EMAIL || "MISSING"
        });
        throw new Error("Email configuration is missing on the server");
    }

    return nodemailer.createTransport({
        host,
        port,
        secure: false,
        auth: { user, pass },
        tls: { rejectUnauthorized: false }
    });
}

async function sendLeadEmails(data: LeadFormData) {
    const transporter = createTransporter();
    const adminEmail = process.env.RECEIVER_EMAIL;
    const currentYear = new Date().getFullYear();

    const serviceLabels: Record<string, string> = {
        website: 'Criação de Site',
        software: 'Software Sob Medida',
        ai: 'Automação com IA',
        seo: 'SEO Técnico',
        other: 'Personalizado'
    };

    const timeframeLabels: Record<string, string> = {
        urgent: 'Urgente (até 2 semanas)',
        '1to2': '1–2 meses',
        '3to6': '3–6 meses',
        flexible: 'Flexível'
    };

    const countryForCurrency = data.detectedCountry || data.country;
    const currencyCode = getCurrencyForCountry(countryForCurrency);
    const locale = data.language === 'en' ? 'en-US' : 'pt-BR';

    // Valores base para conversão (considerando BRL como referência)
    const baseValues = {
        v5k: 5000,
        v15k: 15000,
        v30k: 30000
    };

    const format = (val: number) => formatCurrency(convertFromBRL(val, currencyCode), currencyCode, locale);

    const budgetLabels: Record<string, string> = data.language === 'en' ? {
        lt5k: `Up to ${format(baseValues.v5k)}`,
        '5to15': `${format(baseValues.v5k)} – ${format(baseValues.v15k)}`,
        '15to30': `${format(baseValues.v15k)} – ${format(baseValues.v30k)}`,
        gt30: `Over ${format(baseValues.v30k)}`,
        undecided: 'Undecided'
    } : {
        lt5k: `Até ${format(baseValues.v5k)}`,
        '5to15': `${format(baseValues.v5k)} – ${format(baseValues.v15k)}`,
        '15to30': `${format(baseValues.v15k)} – ${format(baseValues.v30k)}`,
        gt30: `Acima de ${format(baseValues.v30k)}`,
        undecided: 'A definir'
    };

    const servicesHtml = data.services.map(s => serviceLabels[s] || s).join(", ");
    const formattedBudget = budgetLabels[data.budget] || data.budget;
    const formattedTimeframe = timeframeLabels[data.timeframe] || data.timeframe;

    let countryName = data.country;
    try {
        const regionNames = new Intl.DisplayNames(['pt'], { type: 'region' });
        countryName = regionNames.of(data.country) || data.country;
    } catch (e) {
        console.error("Error formatting country name:", e);
    }
    const flagUrl = `https://flagcdn.com/w40/${data.country.toLowerCase()}.png`;

    const lang = data.language === 'en' ? 'en' : 'pt';

    const translations = {
        pt: {
            subject: "Recebemos seu contato! - Monfily",
            title: `Olá, ${data.name}!`,
            message: `Obrigado por entrar em contato com a Monfily. Recebemos seus dados e nossa equipe analisará sua solicitação para o projeto na <strong>${data.company}</strong>.<br><br>Em até 1 dia útil entraremos em contato para agendarmos uma conversa inicial.`,
            button: "Conheça nosso portfólio",
            footer: `&copy; ${currentYear} Monfily Digital. Todos os direitos reservados.`,
            closing: "Estamos ansiosos para trabalhar com você!"
        },
        en: {
            subject: "We received your contact! - Monfily",
            title: `Hello, ${data.name}!`,
            message: `Thank you for reaching out to Monfily. We have received your information and our team will analyze your request for the project at <strong>${data.company}</strong>.<br><br>We will get in touch within 1 business day to schedule an initial conversation.`,
            button: "Check our portfolio",
            footer: `&copy; ${currentYear} Monfily Digital. All rights reserved.`,
            closing: "We look forward to working with you!"
        }
    };

    const t = translations[lang];

    // Email to Admin (styled)
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Novo Lead - Monfily</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fustat:wght@400;700&display=swap');
    html, body { margin: 0; padding: 0; height: 100%; width: 100%; background-color: #fcfcfc; }
    .stripe-bg { background-color: #fcfcfc; background-image: repeating-linear-gradient(45deg, #E2E7F1 0px, #E2E7F1 1px, transparent 1px, transparent 12px); }
    table { border-spacing: 0; }
    .email-wrapper { width: 100%; height: 100%; padding: 40px 0; }
    .email-container { width: 600px; max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
    .content-cell { font-family: 'Fustat', 'Segoe UI', Helvetica, Arial, sans-serif; color: #1C1C1E; padding: 40px; }
    .data-row { margin: 0 0 12px 0; font-size: 16px; line-height: 1.6; color: #4B5563; }
    .data-label { color: #1C1C1E; font-weight: bold; }
    .link-action { color: #2869D6; text-decoration: none; font-weight: bold; border-bottom: 1px dotted #2869D6; }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 0 !important; }
      .email-container { width: 92% !important; max-width: 92% !important; margin: 0 auto !important; border: 1px solid #E2E7F1 !important; }
      .content-cell { padding: 30px 20px !important; }
      .title { font-size: 22px !important; }
    }
  </style>
</head>
<body class="stripe-bg">
  <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" valign="middle" class="email-wrapper">
        <table class="email-container" width="600" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #E2E7F1; border-collapse: separate;">
          <tr>
            <td style="padding: 20px 20px 0 20px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="color: #E2E7F1; font-size: 20px; line-height: 1;">✦</td>
                  <td align="right" style="color: #E2E7F1; font-size: 20px; line-height: 1;">✦</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 10px 20px 30px 20px; border-bottom: 1px solid #E2E7F1;">
              <div style="font-family: 'Fustat', sans-serif; font-size: 28px; font-weight: bold; color: #2869D6; letter-spacing: -1px;">Monfily</div>
            </td>
          </tr>
          <tr>
            <td class="content-cell">
              <h2 class="title" style="margin: 0 0 24px 0; font-size: 24px; font-weight: bold; color: #1C1C1E; font-family: 'Fustat', sans-serif;">
                Novo contato recebido pelo site
              </h2>
              <div style="margin-bottom: 32px;">
                <p class="data-row"><span class="data-label">Nome:</span> ${data.name}</p>
                <p class="data-row"><span class="data-label">E-mail:</span> <a href="mailto:${data.email}" class="link-action">${data.email}</a></p>
                <p class="data-row"><span class="data-label">Telefone:</span> <a href="https://wa.me/${data.phone}" target="_blank" class="link-action">${data.phone} ⬈</a></p>
                <p class="data-row">
                  <span class="data-label">País:</span> 
                  <img src="${flagUrl}" width="20" alt="${data.country}" style="vertical-align: middle; margin-right: 4px; border-radius: 2px;">
                  ${countryName}
                </p>
                <p class="data-row"><span class="data-label">Empresa:</span> ${data.company}</p>
                <p class="data-row"><span class="data-label">Website:</span> ${data.website || "N/A"}</p>
                <p class="data-row"><span class="data-label">Serviços:</span> ${servicesHtml}</p>
                <p class="data-row"><span class="data-label">Orçamento:</span> ${formattedBudget}</p>
                <p class="data-row"><span class="data-label">Prazo:</span> ${formattedTimeframe}</p>
                <div style="margin-top: 24px; padding-top: 24px; border-top: 1px dashed #E2E7F1;">
                  <p class="data-row" style="margin-bottom: 8px;"><span class="data-label">Mensagem:</span></p>
                  <p style="margin: 0; color: #4B5563; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9fafb; border-top: 1px solid #E2E7F1; padding: 20px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" valign="bottom" width="30" style="color: #E2E7F1; font-size: 20px; line-height: 1;">✦</td>
                  <td align="center" style="padding: 10px;">
                    <p style="margin: 0; font-size: 14px; color: #9CA3AF; font-family: 'Fustat', sans-serif;">Notificação automática do sistema</p>
                  </td>
                  <td align="right" valign="bottom" width="30" style="color: #E2E7F1; font-size: 20px; line-height: 1;">✦</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td height="60" style="background: linear-gradient(to top, rgba(40, 105, 214, 0.08), transparent);"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Email to Lead (styled)
    const leadHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Monfily</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fustat:wght@400;700&display=swap');
    html, body { margin: 0; padding: 0; height: 100%; width: 100%; background-color: #fcfcfc; }
    .stripe-bg { background-color: #fcfcfc; background-image: repeating-linear-gradient(45deg, #E2E7F1 0px, #E2E7F1 1px, transparent 1px, transparent 12px); }
    table { border-spacing: 0; }
    .email-wrapper { width: 100%; height: 100%; padding: 40px 0; }
    .email-container { width: 600px; max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
    .content-cell { font-family: 'Fustat', 'Segoe UI', Helvetica, Arial, sans-serif; color: #1C1C1E; padding: 40px; }
    .button-style { background-color: #2869D6; color: #ffffff !important; padding: 12px 28px; font-size: 15px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block; font-family: 'Fustat', sans-serif; }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 0 !important; }
      .email-container { width: 92% !important; max-width: 92% !important; margin: 0 auto !important; border: 1px solid #E2E7F1 !important; }
      .content-cell { padding: 30px 20px !important; }
      .title { font-size: 22px !important; }
    }
  </style>
</head>
<body class="stripe-bg">
  <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" valign="middle" class="email-wrapper">
        <table class="email-container" width="600" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #E2E7F1; border-collapse: separate;">
          <tr>
            <td style="padding: 20px 20px 0 20px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="color: #E2E7F1; font-size: 20px; line-height: 1;">✦</td>
                  <td align="right" style="color: #E2E7F1; font-size: 20px; line-height: 1;">✦</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 10px 20px 30px 20px; border-bottom: 1px solid #E2E7F1;">
              <div style="font-family: 'Fustat', sans-serif; font-size: 28px; font-weight: bold; color: #2869D6; letter-spacing: -1px;">Monfily</div>
            </td>
          </tr>
          <tr>
            <td class="content-cell">
              <h1 class="title" style="margin: 0 0 24px 0; font-size: 24px; font-weight: bold; color: #1C1C1E; font-family: 'Fustat', sans-serif;">${t.title}</h1>
              <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.7; color: #4B5563;">${t.message}</p>
              <div style="text-align: left; margin-bottom: 40px;">
                <a href="https://monfily.com" target="_blank" class="button-style" style="color: #ffffff;">${t.button}</a>
              </div>
              <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #4B5563;">${t.closing}</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9fafb; border-top: 1px solid #E2E7F1; padding: 20px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" valign="bottom" width="30" style="color: #E2E7F1; font-size: 20px; line-height: 1;">✦</td>
                  <td align="center" style="padding: 10px;">
                    <p style="margin: 0; font-size: 14px; color: #9CA3AF; font-family: 'Fustat', sans-serif;">${t.footer}</p>
                  </td>
                  <td align="right" valign="bottom" width="30" style="color: #E2E7F1; font-size: 20px; line-height: 1;">✦</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td height="60" style="background: linear-gradient(to top, rgba(40, 105, 214, 0.08), transparent);"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await Promise.all([
        transporter.sendMail({
            from: `"Monfily Website" <${process.env.EMAIL_USER}>`,
            to: adminEmail,
            subject: `Novo Lead: ${data.name} - ${data.company}`,
            html: adminHtml,
        }),
        transporter.sendMail({
            from: `"Monfily Digital" <${process.env.EMAIL_USER}>`,
            to: data.email,
            subject: t.subject,
            html: leadHtml,
        }),
    ]);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        console.log("Received contact form submission:", req.body);

        // Basic server-side rate limit using cookies as a secondary layer
        const lastEmailSent = req.cookies?.[`sent_${req.body.email?.replace(/[^a-zA-Z0-9]/g, '_')}`];
        if (lastEmailSent && Date.now() - parseInt(lastEmailSent) < 24 * 60 * 60 * 1000) {
            return res.status(429).json({ message: "Limite de 1 envio por e-mail a cada 24 horas excedido" });
        }

        const result = leadFormSchema.safeParse(req.body);
        if (!result.success) {
            console.warn("Validation failed:", result.error.errors);
            return res.status(400).json({
                message: "Dados inválidos",
                errors: result.error.errors
            });
        }

        console.log("Sending emails for lead:", result.data.email);
        await sendLeadEmails(result.data);
        console.log("Emails sent successfully");

        // Set a cookie to help with rate limiting (24h)
        const cookieName = `sent_${result.data.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
        res.setHeader('Set-Cookie', `${cookieName}=${Date.now()}; Path=/; Max-Age=${24 * 60 * 60}; HttpOnly; SameSite=Strict`);

        return res.status(200).json({ message: "Formulário enviado com sucesso" });
    } catch (error) {
        console.error("Error processing contact form:", error);
        return res.status(500).json({
            message: "Erro ao enviar formulário",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
