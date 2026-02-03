import nodemailer from "nodemailer";
import type { LeadFormData } from "@shared/schemas/schema";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    const host = process.env.EMAIL_HOST;
    const port = parseInt(process.env.EMAIL_PORT || "587");
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!host || !user || !pass) {
      console.error("Missing email configuration:", { host, user, pass: pass ? "set" : "missing" });
      throw new Error("Email configuration is missing");
    }

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: false, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  return transporter;
}

export async function sendLeadEmails(data: LeadFormData) {
  const adminEmail = process.env.RECEIVER_EMAIL;
  const currentTransporter = getTransporter();

  const servicesHtml = data.services.join(", ");

  // Email to Admin
  const adminMailOptions = {
    from: `"Monfily Website" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `Novo Lead: ${data.name} - ${data.company}`,
    html: `
      <h2>Novo contato recebido pelo site</h2>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>E-mail:</strong> ${data.email}</p>
      <p><strong>Telefone:</strong> ${data.phone}</p>
      <p><strong>País:</strong> ${data.country}</p>
      <p><strong>Empresa:</strong> ${data.company}</p>
      <p><strong>Website:</strong> ${data.website || "N/A"}</p>
      <p><strong>Serviços:</strong> ${servicesHtml}</p>
      <p><strong>Orçamento:</strong> ${data.budget}</p>
      <p><strong>Prazo:</strong> ${data.timeframe}</p>
      <p><strong>Mensagem:</strong><br>${data.message}</p>
    `,
  };

  // Email to Lead (Mobile First Design)
  const leadMailOptions = {
    from: `"Monfily Digital" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: `Recebemos seu contato! - Monfily`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contato Monfily</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9fafb;
      color: #1C1C1E;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      padding: 40px 20px;
      text-align: center;
      background-color: #ffffff;
      border-bottom: 1px solid #E2E7F1;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #2869D6;
      text-decoration: none;
    }
    .content {
      padding: 40px 20px;
    }
    .title {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #1C1C1E;
    }
    .text {
      font-size: 16px;
      line-height: 1.6;
      color: #4B5563;
      margin-bottom: 30px;
    }
    .button-container {
      text-align: center;
      margin-bottom: 40px;
    }
    .button {
      background-color: #2869D6;
      color: #ffffff !important;
      padding: 15px 30px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: bold;
      display: inline-block;
    }
    .footer {
      padding: 40px 20px;
      text-align: center;
      font-size: 14px;
      color: #9CA3AF;
      background-color: #f9fafb;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
      .content {
        padding: 30px 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Monfily</div>
    </div>
    <div class="content">
      <div class="title">Olá, ${data.name}!</div>
      <div class="text">
        Obrigado por entrar em contato com a Monfily. Recebemos seus dados e nossa equipe analisará sua solicitação para o projeto na <strong>${data.company}</strong>.
        <br><br>
        Em até 1 dia útil entraremos em contato para agendarmos uma conversa inicial.
      </div>
      <div class="button-container">
        <a href="https://monfily.com" class="button">Conheça nosso portfólio</a>
      </div>
      <div class="text">
        Estamos ansiosos para trabalhar com você!
      </div>
    </div>
    <div class="footer">
      &copy; 2026 Monfily Digital. Todos os direitos reservados.
    </div>
  </div>
</body>
</html>
    `,
  };

  await Promise.all([
    currentTransporter.sendMail(adminMailOptions),
    currentTransporter.sendMail(leadMailOptions),
  ]);
}
