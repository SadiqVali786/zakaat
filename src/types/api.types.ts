import { ErrorResponseType } from "@/lib/api-error-success-handlers/error";
import { SuccessResponseType } from "@/lib/api-error-success-handlers/success";

export type ServerActionReturnType<T = unknown> =
  | SuccessResponseType<T>
  | ErrorResponseType;
