import prisma from "@/lib/db";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // console.log(user)
      const existingUser = await prisma.user.findFirst({
        where: {
          AND: [
            { email: user.email || "" },
            { name: user.name || "" }
          ]
        },
      });
      console.log('user exist already');
      
      if (!existingUser) {
        const isVerifiedUser = await prisma.user.findFirst({
          where: {
            AND: [
              {email: user.email || ""},
              {isActive: true}
            ]
          },
        });

        if (isVerifiedUser) {
          await prisma.user.update({
            where: { email: user.email || "" },
            data: {
              name: user.name,
              avatar: user.image,
            }
          });
        }
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
