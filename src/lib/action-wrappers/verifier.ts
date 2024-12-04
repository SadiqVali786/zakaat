import { getServerSession, Session } from "next-auth";
import { withServerActionAsyncCatcher } from "./async-catcher";
import { authOptions } from "../auth-options";
import { ErrorHandler } from "../api-error-success-handlers/error";
import { ROLE } from "@prisma/client";

// Added session also if we want to use ID
type withAdminServerActionType<T, R> = (
  session: Session,
  args?: T
) => Promise<R>;

export function withVerifierServerAction<T, R>(
  serverAction: withAdminServerActionType<T, R>
): (args?: T) => Promise<R> {
  return withServerActionAsyncCatcher(async (args?: T) => {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== ROLE.VERIFIER) {
      throw new ErrorHandler(
        "You must be authenticated to access this resource.",
        "UNAUTHORIZED"
      );
    }
    return await serverAction(session, args);
  });
}
