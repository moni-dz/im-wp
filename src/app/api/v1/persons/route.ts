import { db } from "@/app/db";
import { person } from "@/app/db/schema";

export async function GET(req: Request) {
    const users = await db.select().from(person);

    return Response.json(users);
}