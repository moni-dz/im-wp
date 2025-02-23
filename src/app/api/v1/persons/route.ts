import { db } from "@/db";

export async function GET(req: Request) {
    const users = await db.query.person.findMany();
    return Response.json(users);
}