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

// declare module 'next-auth' {
//   interface User {
//     isVerified: boolean;
//     role: string;
//     onBoard: boolean;
//   }
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       role: string;
//       name: string;
//       isVerified: boolean;
//       image?: string;
//       onBoard: boolean;
//     };
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     id: string;
//     isVerified: boolean;
//     role: string;
//     onBoard: boolean;
//   }
// }
