import { db } from "@/db";
import { person } from "@/db/schema";

export async function GET(req: Request) {
    const users = await db.select().from(person);

    return Response.json(users);
}