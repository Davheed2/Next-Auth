import axios from "axios";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // email: {},
        // password: {},
      },
      async authorize(credentials, req) {
        //console.log(credentials);
        if (typeof credentials !== "undefined") {
          // const res = await axios.post(
          //   "https://vigoplace.com/server/api/admin/auth/login",
          //   {
          //     email: credentials.email,
          //     password: credentials.password,
          //   }
          // );
          // const res = await authenticate(
          //   credentials.email,
          //   credentials.password
          // );

          const res = credentials;
          if (typeof res !== "undefined") {
            //return { ...res.user, apiToken: res.token };
            return { ...res, apiToken: res.csrfToken };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      //console.log(token, user);
      if (user) {
        token.user = user;
      }
      //console.log(token);
      return token;
    },
    async session({ session, token, user }) {
      console.log(user);
      console.log(session);
      // Send properties to the client, like an access_token from a provider.
      session.user = token.user;
      console.log(session);
      return session;
    },
  },
  pages: {
    signIn: "/",
    // signOut: "/auth/signout",
    error: "/", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
