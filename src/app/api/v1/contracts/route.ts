import { ContractDetails } from "@/components/types";
import { db } from "@/db";
import { contract, contractfullview } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest } from 'next/server'


export async function GET(req: NextRequest) {
    const contractFull: ContractDetails[] = await db.select().from(contractfullview);
    return Response.json(contractFull);
}

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    await db.delete(contract).where(eq(contract.id, Number(id)));
    return Response.json({}, { status: 200 });
}