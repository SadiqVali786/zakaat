import { getServerSession, Session } from "next-auth";
import { withServerActionAsyncCatcher } from "./async-catcher";
import { ErrorHandler } from "../api-error-success-handlers/error";
import { authOptions } from "../auth-options";

type withSessionType<T, R> = (session: Session, args?: T) => Promise<R>;

export function withSession<T, R>(
  serverAction: withSessionType<T, R>
): (args?: T) => Promise<R> {
  return withServerActionAsyncCatcher(async (args?: T) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw new ErrorHandler(
        "You must be authenticated to access this resource.",
        "UNAUTHORIZED"
      );
    }
    return await serverAction(session, args);
  });
}
