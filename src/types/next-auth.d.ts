import { Location, ROLE } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    oauthId: string;
    role: string;
    fullname: string;
    selfie: string;
    phoneNum: string;
  }
  interface Session {
    user: {
      id: string;
      oauthId: string;
      role: string;
      fullname: string;
      selfie: string;
      phoneNum: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    fullname: string;
    role: ROLE;
    image: string;
    selfie: string;
    location: Location;
    phoneNum: string;
  }
}
