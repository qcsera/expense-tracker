import NextAuth from "next-auth";
import Providers from "next-auth/providers";


export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        if (
          credentials.username !== "john1234" &&
          credentials.password !== "john1234"
        ) {
          throw new Error("No user found!");
        }

        return {
          user: credentials.username,
        };
      },
    }),
  ],
});