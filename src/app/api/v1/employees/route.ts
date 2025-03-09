import { EmployeeData } from "@/components/types";
import { db } from "@/db";
import { contractemployeedata } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET() {
    const employees: EmployeeData[] = await db.select().from(contractemployeedata);
    return Response.json(employees);
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const {
        name,
        gender,
        email,
        contactNumber,
        street,
        barangay,
        city,
        province,
        status,
        skills,
        dateContracted,
        role,
        remarks
    } = Object.fromEntries(formData.entries());

    await db.execute(sql`CALL ADD_EMPLOYEE(${name},${gender},${email},${contactNumber},${street},${barangay},${city},${province},${status},${skills},${dateContracted},${role},NULL,${remarks})`);
    return Response.json({}, { status: 200 });
}