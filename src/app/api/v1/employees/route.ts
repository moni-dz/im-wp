import { EmployeeData } from "@/components/types";
import { db } from "@/db";
import { contractemployeedata } from "@/db/schema";

export async function GET() {
    const employees: EmployeeData[] = await db.select().from(contractemployeedata);
    return Response.json(employees);
}