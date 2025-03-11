import { Location } from "@/components/types";
import { db } from "@/db";

export async function GET() {
    const locations: Location[] = await db.query.location.findMany();
    return Response.json(locations);
}