import { ContractDetails } from "@/components/types";
import { db } from "@/db";
import { contractfullview } from "@/db/schema";

export async function GET(req: Request) {
    const contractFull: ContractDetails[] = await db.select().from(contractfullview);
    return Response.json(contractFull);
}