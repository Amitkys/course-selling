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
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email || "" },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: user.name || "",
            email: user.email || "",
            avatar: user.image || "",
          },
        });
      }

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
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}/home`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
