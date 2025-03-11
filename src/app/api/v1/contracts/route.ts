import { ContractDetails } from "@/components/types";
import { db } from "@/db";
import { contract, contractfullview } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
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

export async function PUT(req: NextRequest) {
    const formData = await req.formData();
    
    const {
        projectName,
        street,
        barangay,
        city,
        province,
        contractAmount,
        dateStart,
        dateEnd,
        projectDescription,
        clientId,
    } = Object.fromEntries(formData.entries());


    await db.execute(sql`CALL UPDATE_CONTRACT(${projectName},${street},${barangay},${city},${province},${contractAmount},${dateStart},${dateEnd},${projectDescription},${clientId})`);
    return Response.json({}, { status: 200 });
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const {
        contractAmount,
        contractDate,
        startDate,
        endDate,
        status,
        remarks,
        projectName,
        projectDescription,
        clientName,
        clientEmail,
        clientContactNumber,
        clientGender,
        street,
        barangay,
        city,
        province
    } = Object.fromEntries(formData.entries());

    await db.execute(sql`CALL ADD_CONTRACT(${contractAmount},${contractDate},${startDate},${endDate},${status},${remarks},${projectName},${projectDescription},${clientName},${clientEmail},${clientContactNumber},${clientGender},${street},${barangay},${city},${province})`);
    return Response.json({}, { status: 200 });
}