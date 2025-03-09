import { db } from "@/db";
import { client, clientdata, location, person } from "@/db/schema";
import { NextRequest } from "next/server";

export async function GET() {
    const clients = await db.select().from(clientdata);
    return Response.json(clients);
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    console.log(formData)

    const newLocation: typeof location.$inferInsert = {
        // @ts-ignore
        street: formData.get('street'),
        // @ts-ignore
        barangay: formData.get('barangay'),
        // @ts-ignore
        city: formData.get('city'),
        // @ts-ignore
        province: formData.get('province'),
    };

    const locationId = await db.insert(location).values(newLocation).$returningId();

    const newPerson: typeof person.$inferInsert = {
        // @ts-ignore
        name: formData.get('name'),
        // @ts-ignore
        gender: formData.get('gender'),
        // @ts-ignore
        email: formData.get('email'),
        // @ts-ignore
        contactNumber: formData.get('contactNumber'),
        locationId: locationId[0].id,
    };

    // @ts-ignore
    const personId = await db.insert(person).values(newPerson).$returningId();

    await db.insert(client).values({ personId: personId[0].id });
    return Response.json({}, { status: 200 });
}