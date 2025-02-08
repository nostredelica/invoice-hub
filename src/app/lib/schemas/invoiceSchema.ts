import { z } from "zod";

export const invoiceSchema = z.object({
  name: z.string().min(1, "Invoice name is required"),
  number: z
    .string()
    .min(1, "Invoice number is required")
    .regex(/^\d+$/, "Invoice number must contain only digits"),
  dueDate: z.date({ required_error: "Due date is required" }),
  amount: z
    .number()
    .min(1, "Amount must be greater than 0")
    .positive("Amount must be greater than 0"),
  status: z.enum(["Paid", "Unpaid", "Pending"], {
    required_error: "Status is required",
  }),
  createdAt: z.string().default(() => new Date().toISOString()),
});
