import { z } from "zod";

export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = InsertUser & { id: string };

export const leadFormSchema = z.object({
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

export type LeadFormData = z.infer<typeof leadFormSchema>;
