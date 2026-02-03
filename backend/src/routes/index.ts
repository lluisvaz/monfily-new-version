import type { Express } from "express";
import { createServer, type Server } from "http";
import { leadFormSchema } from "@shared/schemas/schema";
import { sendLeadEmails } from "../email";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Received contact form submission:", req.body);
      const result = leadFormSchema.safeParse(req.body);
      if (!result.success) {
        console.warn("Validation failed for contact form:", result.error.errors);
        return res.status(400).json({ 
          message: "Dados inválidos", 
          errors: result.error.errors 
        });
      }

      console.log("Sending emails for lead:", result.data.email);
      await sendLeadEmails(result.data);
      console.log("Emails sent successfully");
      res.json({ message: "Formulário enviado com sucesso" });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ message: "Erro ao enviar formulário" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
