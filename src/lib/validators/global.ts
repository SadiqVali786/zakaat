import { z } from "zod";

export const userIdSchema = z.object({
  id: z.string(),
});

export type UserIdSchemaType = z.infer<typeof userIdSchema>;
