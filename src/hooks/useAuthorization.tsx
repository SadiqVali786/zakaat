"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import APP_PATHS from "@/config/path.config";
import { ROLE } from "@prisma/client";

const useAuthorization = () => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace(APP_PATHS.SIGNIN);
      return;
    }

    if (session.status === "authenticated") {
      const user = session.data?.user;

      if (!user) {
        router.replace(APP_PATHS.SIGNIN);
        return;
      }

      if (!user.phoneNum) {
        router.replace(APP_PATHS.WELCOME);
        return;
      }

      if (
        (pathname.includes("verifier") && user.role !== ROLE.VERIFIER) ||
        (pathname.includes("donor") && user.role !== ROLE.DONOR)
      )
        router.replace(APP_PATHS.SIGNIN);

      // switch (user.role) {
      //   case ROLE.VERIFIER:
      //     router.replace(APP_PATHS.SEARCH_APPLICANT);
      //     break;
      //   case ROLE.DONOR:
      //     router.replace(APP_PATHS.ZAKAAT_APPLICATIONS);
      //     break;
      //   default:
      //     router.replace(APP_PATHS.HOME);
      // }
    }
  }, [session, router]);

  return { session, router };
};

export default useAuthorization;
