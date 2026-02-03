import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

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
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
