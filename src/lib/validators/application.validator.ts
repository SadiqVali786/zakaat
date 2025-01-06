import { z } from "zod";

export const applicationSchema = z.object({
  fullname: z.string().trim().optional(),
  phoneNum: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
  amount: z.coerce.number().min(0).max(100000),
  reason: z.string().trim().max(300, "Reason must not exceed 300 characters."),
  hide: z.boolean(),
  rating: z.coerce.number().min(0).max(10),
});

// https://www.youtube.com/watch?v=AeQ3f4zmSMs&t=1s
// All 10 places for Zod in your React / Next.js app
// FRONTEND
// 1. Form Data
// 2. Third-Party API
// 3. API requests
// 4. Local Storage
// 5. URL domain.com?id=5&color=blue
// BACKEND
// 6. web hooks( => API Route)
// 7. Third Party APIs( => API Route)
// 8. Environment Variables
// 9. File System
// 10. URL domain.com?id=5&color=blue
// 11. DB ORM
