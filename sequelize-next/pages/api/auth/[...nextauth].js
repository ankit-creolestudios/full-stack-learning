import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { setEngine } from 'crypto';
export default NextAuth({
  session: {
    maxAge: 30 * 60,
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          },
        );
        const user = await res.json();
        console.log(user, 'nextauth');
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log(token.user, 'session');
      session.user = token?.user;
      return session;
    },
  },
});
