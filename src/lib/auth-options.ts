/* eslint-disable @typescript-eslint/no-explicit-any */
import { AUTH_TOKEN_EXPIRATION_TIME } from "@/config/auth.config";
import prisma from "@/db";
import { Location, ROLE } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000, // Increase to 10 seconds or more
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      const cuid = account.params?.cuid; // Retrieve cuid from query parameters
      console.log("Sadiq Vali", { cuid });
      const { id: oauthId } = user; // const { id: oauthId, email, name, image: avatar } = user;
      if (cuid) {
        // Handle Signup Process
        try {
          await prisma.user.update({ where: { id: cuid }, data: { oauthId } }); // Save OAuth ID
          return true; // Allow signup and proceed
        } catch (error) {
          console.error("Signup process error:", error);
          return false; // Reject signup if there's an issue
        }
      } else {
        // Handle Sign-In Process
        try {
          const existingUser = await prisma.user.findFirst({
            where: { OR: [{ id: cuid }, { oauthId: oauthId }] },
          });
          if (!existingUser) {
            console.warn("No existing user found for sign-in.");
            return false; // Reject sign-in for non-existent users
          }
          return true; // Allow sign-in
        } catch (error) {
          console.error("Sign-in process error:", error);
          return false; // Reject sign-in if there's an issue
        }
      }
    },

    async jwt({ token, user, trigger, session }: any) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        const foundUser = await prisma.user.findFirst({
          where: {
            OR: [{ oauthId: { equals: user.id } }, { id: { equals: user.id } }],
          },
        });
        if (!foundUser) return null;
        token.oauthId = user.oauthId;
        token.id = foundUser.id;
        token.fullname = foundUser.fullname;
        token.role = foundUser.role;
        token.selfie = foundUser.selfie;
        token.phoneNum = foundUser.phoneNum;
        console.log("Sadiq Vali Token : ", token);
      }
      return token;
    },
    session({ session, token }) {
      if (token && session && session.user) {
        session.user.oauthId = token.oauthId as string;
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.fullname = token.fullname as string;
        session.user.selfie = token.selfie as string;
        session.user.phoneNum = token.phoneNum as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: AUTH_TOKEN_EXPIRATION_TIME,
  },
  jwt: {
    maxAge: AUTH_TOKEN_EXPIRATION_TIME,
  },
  pages: {
    signIn: "/auth/signin",
  },
} satisfies NextAuthOptions;
