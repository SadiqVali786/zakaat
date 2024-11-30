"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// https://stackoverflow.com/a/73136517/10003545
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  upiPhoneNum: z
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
  doorNum: z.string().trim().min(1, "Door number is required."),
  colony: z.string().trim().min(1, "Colony is required."),
  landmark: z.string().trim().optional(),
  village: z.string().trim().min(1, "Village is required."),
  mandal: z.string().trim().min(1, "Mandal is required."),
  district: z.string().trim().min(1, "District is required."),
  state: z.string().trim().min(1, "State is required."),
  pincode: z
    .string()
    .trim()
    .refine((num) => num.length === 6, "Pincode must be exactly 6 digits."),
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
});

const FormWithShadcn = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const setLatAndLongValues = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("latitude", position.coords.latitude);
          form.setValue("longitude", position.coords.longitude);
        },
        (error) => console.error("Error fetching GPS values:", error)
      );
    } else console.error("Geolocation is not supported by this browser.");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-x-[1px] border-neutral-11 pt-10 flex flex-col h-full gap-y-8 items-start px-4"
      >
        <FormField
          control={form.control}
          name="upiPhoneNum"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="UPI Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="selfie"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="file"
                  accept=".jpg, .jpeg, .png, .webp"
                  value={undefined}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="doorNum"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Door Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="colony"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Colony" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Landmark" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="village"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Village" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mandal"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Mandal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="District" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Pincode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" onClick={setLatAndLongValues}>
          Fetch GPS Values
        </Button>
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  readOnly
                  placeholder="Latitude"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  readOnly
                  placeholder="Longitude"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  step="1000"
                  maxLength={10}
                  placeholder="Amount"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Why do you think you are eligible for zakaat? What do you do with the Money?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hide"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm gap-x-8">
              <div className="space-y-0.5">
                <FormLabel>Hide My Identity</FormLabel>
                <FormDescription>
                  Recommended to Reveal your identity to increase the chnaces of
                  getting help.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormWithShadcn;

// ########################################################################################
// ########################################################################################
// ########################################################################################

// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signupSchema, SignupSchemaTypes } from "@/lib/types";

// const FormWithReactHookFormAndZod = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting, defaultValues },
//     reset,
//     getValues,
//     setValue,
//     watch,
//     setError,
//   } = useForm<SignupSchemaTypes>({
//     resolver: zodResolver(signupSchema),
//   });

//   const onSubmit = async (validatedData: SignupSchemaTypes) => {
//     // TODO: submit to server
//     // await new Promise((resolve) => setTimeout(resolve, 1000));
//     // console.log(validatedData);
//     const response = await fetch("/api/signup", {
//       method: "POST",
//       body: JSON.stringify({
//         email: validatedData.email,
//         password: validatedData.password,
//         confirmPassword: 1234567890,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       // response status is not 2XX
//       alert("Submitting form failled!");
//       return;
//     }

//     const responseData = await response.json();
//     if (responseData.errors) {
//       const errors = responseData.errors;
//       if (errors.email) {
//         setError("email", { type: "server", message: errors.email });
//       } else if (errors.password) {
//         setError("password", { type: "server", message: errors.password });
//       } else if (errors.confirmPassword) {
//         setError("confirmPassword", {
//           type: "server",
//           message: errors.confirmPassword,
//         });
//       } else {
//         alert("Something went wrong");
//       }
//     }

//     // reset();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="border-x-[1px] border-neutral-11 pt-10 flex flex-col h-full gap-y-8 items-start px-4"
//     >
//       <input
//         {...register("email")}
//         type="email"
//         placeholder="Email"
//         className="rounded bg-transparent border border-neutral-11 px-4 py-2"
//       />
//       {errors.email && (
//         <p className="text-red-500">{`${errors.email.message}`}</p>
//       )}

//       <input
//         {...register("password")}
//         type="password"
//         placeholder="Password"
//         className="rounded bg-transparent border border-neutral-11 px-4 py-2"
//       />
//       {errors.password && (
//         <p className="text-red-500">{`${errors.password.message}`}</p>
//       )}

//       <input
//         {...register("confirmPassword")}
//         type="password"
//         placeholder="Confirm Password"
//         className="rounded bg-transparent border border-neutral-11 px-4 py-2"
//       />
//       {errors.confirmPassword && (
//         <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
//       )}

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-blue-500 disabled:bg-gray-500 py-2 px-4 rounded"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default FormWithReactHookFormAndZod;

// ########################################################################################
// ########################################################################################
// ########################################################################################

// "use client";

// import { useForm, type FieldValues } from "react-hook-form";
// // import type { FieldValues } from "react-hook-form";

// const FormWithReactHookForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting, defaultValues },
//     reset,
//     getValues,
//     setValue,
//     watch,
//   } = useForm();

//   const onSubmit = async (validatedData: FieldValues) => {
//     // TODO: submit to server
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     console.log(validatedData);

//     reset();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="border-x-[1px] border-neutral-11 pt-10 flex flex-col h-full gap-y-8 items-start px-4"
//     >
//       <input
//         {...register("email", { required: "Email is required" })}
//         type="email"
//         placeholder="Email"
//         className="rounded bg-transparent border border-neutral-11 px-4 py-2"
//       />
//       {errors.email && (
//         <p className="text-red-500">{`${errors.email.message}`}</p>
//       )}

//       <input
//         {...register("password", {
//           required: "Password is required",
//           minLength: {
//             value: 10,
//             message: "Password must be atleast 10 characters",
//           },
//         })}
//         type="password"
//         placeholder="Password"
//         className="rounded bg-transparent border border-neutral-11 px-4 py-2"
//       />
//       {errors.password && (
//         <p className="text-red-500">{`${errors.password.message}`}</p>
//       )}

//       <input
//         {...register("confirmPassword", {
//           required: "Confirm Password is required",
//           validate: (value) =>
//             value === getValues("password") || "Password must match",
//         })}
//         type="password"
//         placeholder="Confirm Password"
//         className="rounded bg-transparent border border-neutral-11 px-4 py-2"
//       />
//       {errors.confirmPassword && (
//         <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
//       )}

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-blue-500 disabled:bg-gray-500 py-2 px-4 rounded"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default FormWithReactHookForm;

// ########################################################################################
// ########################################################################################
// ########################################################################################

// "use client";

// import React, { useState } from "react";

// const FormWithoutReactHookForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<string[]>([]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // validation
//     if (password !== confirmPassword) {
//       setErrors(["Password and Confirm Password must match"]);
//       setIsSubmitting(false);
//       return;
//     }

//     // TODO: Submit to server
//     await new Promise((r) => setTimeout(r, 1000));
//     console.log(e);

//     setEmail("");
//     setPassword("");
//     setConfirmPassword("");
//     setIsSubmitting(false);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="border-x-[1px] border-neutral-11 pt-10 flex flex-col h-full gap-y-8 items-start px-4"
//     >
//       {errors.length > 0 && (
//         <ul>
//           {errors.map((error) => (
//             <li
//               key={error}
//               className="bg-red-100 text-red-500 px-4 py-2 rounded"
//             >
//               {error}
//             </li>
//           ))}
//         </ul>
//       )}
//       <input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         type="email"
//         placeholder="Email"
//         className="rounded bg-transparent border border-neutral-11 px-4 py-2"
//         required
//       />
//       <input
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         type="password"
//         placeholder="Password"
//         className="rounded bg-transparent border border-neutral-11 px-4 py-2"
//         required
//       />
//       <input
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         type="password"
//         placeholder="Confirm Password"
//         className="rounded bg-transparent border border-neutral-11 px-4 py-2"
//         required
//       />
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-blue-500 disabled:bg-gray-500 py-2 px-4 rounded"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default FormWithoutReactHookForm;
