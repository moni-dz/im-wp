import { EmployeeData } from "@/components/types";
import { db } from "@/db";
import { contractemployeedata, employee } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
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

export async function PUT(req: NextRequest) {
    const formData = await req.formData();
    const {
        employeeId,
        personId,
        roleId,
        personName,
        status,
        skills,
        dateContracted,
        roleName
    } = Object.fromEntries(formData.entries());

    await db.execute(sql`CALL UPDATE_EMPLOYEE(${employeeId},${personId},${roleId},${personName},${status},${skills},${dateContracted},${roleName})`);
    return Response.json({}, { status: 200 });
}

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    await db.delete(employee).where(eq(employee.id, Number(id)));
    return Response.json({}, { status: 200 });
}