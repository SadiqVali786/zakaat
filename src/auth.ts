import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTH_TOKEN_EXPIRATION_TIME } from "./config/auth.config";
import APP_PATHS from "./config/path.config";
import prisma from "./db";
import { ROLE } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") return { ...token, ...session.user };
      if (user) {
        const foundUser = await prisma.user.findFirst({
          where: { email: user?.email as string },
        });
        if (foundUser) {
          token.id = foundUser.id;
          token.role = foundUser.role;
          token.fullname = foundUser.fullname;
          token.phoneNum = foundUser.phoneNum;
          token.selfie = foundUser.selfie;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token && session && session.user) {
        if (token?.phoneNum) {
          session.user.id = token.id as string;
          session.user.role = token.role as ROLE;
          session.user.fullname = token.fullname as string;
          session.user.phoneNum = token.phoneNum as string;
          session.user.selfie = token.selfie as string;
          delete session.user.name;
          delete session.user.image;
          delete session.user.email;
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: AUTH_TOKEN_EXPIRATION_TIME,
  },
  jwt: { maxAge: AUTH_TOKEN_EXPIRATION_TIME },
  pages: { signIn: APP_PATHS.SIGNIN },
});
