import { z } from "zod";

export const createApplicationSchema = z.object({
  authorId: z.string().trim().cuid("AuthorId must be a valid CUID."),
  amount: z
    .string()
    .transform((val) => parseFloat(val))
    .refine(
      (num) => !isNaN(num) && num > 0,
      "Amount must be a positive number."
    )
    .refine(
      (num) => num.toFixed(2).length <= 10,
      "Amount must not exceed a valid range."
    ),
  reason: z.string().trim().max(300, "Reason must not exceed 300 characters."),
  hide: z.boolean().default(false).optional(),
  rating: z.number().min(0).max(10),
});

export const editApplicationSchema = createApplicationSchema.partial();

export const applicationIdSchema = z.object({
  id: z.string().trim().cuid("ApplicationId must be a valid CUID."),
});

export type CreateApplicationSchemaType = z.infer<
  typeof createApplicationSchema
>;
export type EditApplicationSchemaType = z.infer<typeof editApplicationSchema>;
export type ApplicationIdSchemaType = z.infer<typeof applicationIdSchema>;
