import prisma from "@/lib/db";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Ensure user exists in EmailWithRoll
      const emailWithRollEntry = await prisma.emailWithRoll.findUnique({
        where: { email: user.email || "" },
      });

      if (!emailWithRollEntry) {
        // Reject sign-in if user is not in EmailWithRoll
        console.error("Sign-in attempt rejected: User not found in EmailWithRoll.");
        return false;
      }

      // Check if the user already exists in User table
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email || "" },
      });

      if (!existingUser) {
        // Create a new user in User table linked to EmailWithRoll
        await prisma.user.create({
          data: {
            name: user.name || "",
            email: user.email || "",
            avatar: user.image || "",
          },
        });
      }

      return true; // Allow sign-in
    },

    async session({ session, token }) {
      if (token?.email) {
        const loggedInUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (loggedInUser && session.user) {
          session.user.id = loggedInUser.id;
          session.user.isAdmin = loggedInUser.isAdmin;
          session.user.isSuperAdmin = loggedInUser.isSuperAdmin;
        }
      }
      return session;
    },

    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}/home`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
