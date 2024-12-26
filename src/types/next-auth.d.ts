import { Location, ROLE } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    fullname: string;
    selfie: string;
    phoneNum: string;
    email: string;
    longitude: number;
    latitude: number;
  }
  interface Session {
    user: {
      id: string;
      role: string;
      fullname: string;
      selfie: string;
      phoneNum: string;
      longitude: number;
      latitude: number;
      email?: string;
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
    longitude: number;
    latitude: number;
  }
}
