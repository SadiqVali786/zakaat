import { ROLE } from "@prisma/client";
import { z } from "zod";

// https://stackoverflow.com/a/73136517/10003545
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const signupFormSchema = z.object({
  fullname: z.string().trim().min(1, "username is required"),
  phoneNum: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
  selfie: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max image size is 5MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
  latitude: z
    .number()
    .refine(
      (num) => num >= -90 && num <= 90,
      "Latitude must be a valid decimal coordinate."
    ),
  longitude: z
    .number()
    .refine(
      (num) => num >= -180 && num <= 180,
      "Longitude must be a valid decimal coordinate."
    ),
  role: z.nativeEnum(ROLE),
});
