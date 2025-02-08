import { z } from "zod";
import { invoiceSchema } from "../schemas/invoiceSchema";

export type InvoiceFormType = z.infer<typeof invoiceSchema>;
