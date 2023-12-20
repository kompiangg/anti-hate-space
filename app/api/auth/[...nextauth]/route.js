import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await User.findByEmail(session.user.email);
      session.user.id = user.id;

      return session;
    },
    async signIn({ profile }) {
      try {
        const user = await User.findByEmail(profile.email);

        if (!user) {
          const username = profile.email.split("@")[0];
          const slug = generateRandomString(5);

          const user = new User({
            email: profile.email,
            user: profile.name,
            image: profile.picture,
            name: profile.name,
            username: username + slug,
          });
          await user.save();
        }

        return true;
      } catch (error) {
        console.error("signin error", error);
        return false;
      }
    },
  },
});

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export { handler as GET, handler as POST };
