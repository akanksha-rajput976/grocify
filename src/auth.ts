import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import User from "./models/user.model"
import connectDb from "./lib/db"
import bcrypt from "bcryptjs"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
         credentials: {
        email: { label: "email",type:"email" },
        password: { label: "Password", type: "password" },
         },
        async authorize(credentials,request){
            try{
                await connectDb()
                const email=credentials.email
                const password=credentials.password as string
                const user= await User.findOne({email})
                if(!user){
                    throw new Error("No user found with this email")

                }
                const isMatch= await bcrypt.compare(password,user.password)
                if(!isMatch){
                    throw new Error("Invalid credentials")
                }
                return{
                    id:user._id.toString(),
                    name:user.name,
                    email:user.email,
                    role:user.role
                }
            }
            catch(error){
                throw new Error("Database connection error")
            }

         },
    })
  ],
  callbacks:{   
    jwt({token,user}){
        if(user){
            token.id=user.id
            token.name=user.name
            token.email=user.email
            token.role=user.role
        }
        return token;
    },
    session({session,token}){
        if(session.user){
            session.user.id=token.id as string
            session.user.name=token.name as string
            session.user.email=token.email as string
            session.user.role=token.role as string
        }
        return session;
    }, 
  },
  pages:{
    signIn:"/login",
    error:"/login",
  },
  secret:process.env.AUTH_SECRET,
  session:{
    strategy:"jwt",
  }
})