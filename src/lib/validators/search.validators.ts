import { z } from "zod";

export const phoneNumSchema = z.object({
  upiPhoneNum: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
});

export const searchTermSchema = z.object({
  searchTerm: z.string().trim().min(1, "provide atleast 1 character to search"),
});

export type PhoneNumSchemaType = z.infer<typeof phoneNumSchema>;
export type searchTermSchemaType = z.infer<typeof searchTermSchema>;
