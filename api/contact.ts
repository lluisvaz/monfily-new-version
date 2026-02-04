import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { z } from "zod";

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
});

type LeadFormData = z.infer<typeof leadFormSchema>;

function createTransporter() {
    const host = process.env.EMAIL_HOST;
    const port = parseInt(process.env.EMAIL_PORT || "587");
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!host || !user || !pass) {
        console.error("Missing email configuration:", { host, user, pass: pass ? "set" : "missing" });
        throw new Error("Email configuration is missing");
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

    const lang = data.language === 'en' ? 'en' : 'pt';

    const translations = {
        pt: {
            subject: "Recebemos seu contato! - Monfily",
            title: `Olá, ${data.name}!`,
            message: `Obrigado por entrar em contato com a Monfily. Recebemos seus dados e nossa equipe analisará sua solicitação.<br><br>Em até 1 dia útil entraremos em contato.`,
        },
        en: {
            subject: "We received your contact! - Monfily",
            title: `Hello, ${data.name}!`,
            message: `Thank you for reaching out to Monfily. We have received your information.<br><br>We will get in touch within 1 business day.`,
        }
    };

    const t = translations[lang];

    // Email to Admin
    await transporter.sendMail({
        from: `"Monfily Website" <${process.env.EMAIL_USER}>`,
        to: adminEmail,
        subject: `Novo Lead: ${data.name} - ${data.company}`,
        html: `
      <h2>Novo contato recebido</h2>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Telefone:</strong> ${data.phone}</p>
      <p><strong>País:</strong> ${data.country}</p>
      <p><strong>Empresa:</strong> ${data.company}</p>
      <p><strong>Website:</strong> ${data.website || "N/A"}</p>
      <p><strong>Serviços:</strong> ${data.services.join(", ")}</p>
      <p><strong>Orçamento:</strong> ${data.budget}</p>
      <p><strong>Prazo:</strong> ${data.timeframe}</p>
      <p><strong>Mensagem:</strong> ${data.message}</p>
    `,
    });

    // Email to Lead
    await transporter.sendMail({
        from: `"Monfily Digital" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: t.subject,
        html: `
      <h1>${t.title}</h1>
      <p>${t.message}</p>
      <p>© ${currentYear} Monfily Digital</p>
    `,
    });
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

        return res.status(200).json({ message: "Formulário enviado com sucesso" });
    } catch (error) {
        console.error("Error processing contact form:", error);
        return res.status(500).json({
            message: "Erro ao enviar formulário",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
