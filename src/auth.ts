import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/",
    },
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },

            async authorize(credentials) {
                const parsed = z
                    .object({ username: z.string().min(1), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsed.success) {
                    const { username, password } = parsed.data;
                    const hash = await Bun.password.hash(password);

                    const user = await db.query.engineer.findFirst({
                        with: { username, password: hash },
                    });

                    if (!user) return null;
                }

                return null;
            }
        })
    ],
})