import prisma from "@/lib/db";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { RoleType } from '@prisma/client';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email || "" }
      });
  
      // If the user does not exist, deny login
      if (!existingUser) {
  
  
        // If verified, create the user or update their details
        await prisma.user.create({
          data: {
            name: user.name || "",
            email: user.email || "",
            avatar: user.image || "",
            role: RoleType.USER
          }
        });
      }
  
      // If everything is okay, allow login
      return true;
    },
    async session({ session, token }) {
      if (token?.email) {
        const loggedInUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (loggedInUser && session.user) {
          session.user.id = loggedInUser.id;
        }
      }
      return session;
    },
        redirect({ url, baseUrl }) {
            // Check if the URL is on the same origin (domain) as the base URL.
            if (url.startsWith(baseUrl)) {
                return url; // Redirect back to the requested page.
            }
            // Otherwise, redirect to a safe default (e.g., home page).
            return `${baseUrl}/home`;
        }

    },
} as AuthOptions);

export { handler as GET, handler as POST };
