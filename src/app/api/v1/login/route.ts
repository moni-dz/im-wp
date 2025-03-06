import { db } from "@/db";
import { eq } from "drizzle-orm";
import { engineer } from "@/db/schema";

export async function POST(req: Request) {
    const { username, password }: { username: string, password: string } = await req.json();
    const user = await db.query.engineer.findFirst({ where: eq(engineer.username, username) });

    if (!user) {
        return Response.json({ error: 'user not found' }, { status: 404 });
    }

    const valid = await Bun.password.verify(password, user.password);

    if (!valid) {
        return Response.json({ error: 'invalid credentials' }, { status: 401 });
    }

    return Response.json({}, { status: 200 });
}