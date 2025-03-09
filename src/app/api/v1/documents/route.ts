import { Document } from "@/components/types";
import { db } from "@/db";
import { document } from "@/db/schema";

export async function GET() {
    const documents: Document[] = await db.select().from(document);
    return Response.json(documents);
}