import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {username: {label: 'username',type: 'text'},
      password: { label: 'password', type: 'password' }},
      async authorize(credentials) {
          const { email, userPassword } = credentials;
          const emailToBeVerified = email;
          const userPasswordToBeVerified = userPassword;
          let passwordHash = await prisma.user.findMany({
            where: {
              email: emailToBeVerified,
            },
            select: {
               password: true,
               type: true
            }
          });

          if(passwordHash === null) {
            passwordHash = ""; //just setting it to something so doesn't cause error
          }

          const passwordCorrect = await bcrypt.compare(userPassword, passwordHash[0].password);

          if(passwordCorrect) {
            return {email: emailToBeVerified, userCategory: passwordHash[0].type};
          }else{
            return null;
          }
        
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;  // Setting token in session
      return session;
    },
  },
  pages: {
    signIn: "/",  
  },
  secret: process.env.JWT_SECRET,
})

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}