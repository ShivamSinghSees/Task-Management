import { signIn } from "@/lib/queries";
import { User } from "@prisma/client";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        let response;
        if (credentials) {
          response = (await signIn({
            email: credentials?.email,
            password: credentials?.password,
          })) as User;
        }
        if (response) {
          return {
            name: response.name,
            email: response.email,
            id: "null",
            image: response.role,
            role: response.role,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      console.log(user);
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      console.log(token, "token");
      console.log(session, "sksb");
      session.role = token?.role;
      // console.log(session, "sksb");
      // if (session.user) {
      //   session.user.id = token.id as string;
      // }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
