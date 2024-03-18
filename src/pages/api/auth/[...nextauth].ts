import { signIn } from "@/services/auth";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const authOption: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: any = await signIn(email);

        if (user) {
          const passwordConfirm = await compare(password, user.password);

          if (passwordConfirm) {
            return user;
          }

          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        // token.username = user.username;
        token.email = user.email;
        token.phonenumber = user.phonenumber;
        token.password = user.password;
        token.role = user.role;
        token.created_at = user.created_at;
        token.updated_at = user.updated_at;
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }: any) {
      // if ("username" in token) {
      //   session.user.username = token.username;
      // }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("phonenumber" in token) {
        session.user.phonenumber = token.phonenumber;
      }
      if ("password" in token) {
        session.user.password = token.password;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("created_at" in token) {
        session.user.created_at = token.created_at;
      }
      if ("updated_at" in token) {
        session.user.updated_at = token.updated_at;
      }
      if ("id" in token) {
        session.user.id = token.id;
      }

      const encodedToken = jwt.sign(token, process.env.NEXT_AUTH_SECRET || "", {
        algorithm: "HS256",
      });

      session.accessToken = encodedToken;

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOption);
