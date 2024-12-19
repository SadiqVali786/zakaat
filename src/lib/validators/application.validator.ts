import { z } from "zod";

export const applicationSchema = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string().trim().cuid("authorId must be a valid CUID.").optional(),
  phoneNum: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
  amount: z.coerce.number().min(0).max(100000),
  reason: z.string().trim().max(300, "Reason must not exceed 300 characters."),
  hide: z.boolean(),
  rating: z.coerce.number().min(0).max(10),
});
