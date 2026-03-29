import { connectDB } from "@/lib/db";
import Enquiry from "@/lib/models/Enquiry";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  if (!body.name || !body.phone) {
    return NextResponse.json(
      { error: "Name and phone are required" },
      { status: 400 }
    );
  }

  await connectDB();

  await Enquiry.create({
    name: body.name,
    phone: body.phone,
    email: body.email || "",
    message: body.message || "",
    products: [],
    source: "contact",
    status: "New",
  });

  return NextResponse.json({ message: "Inquiry submitted successfully!" });
}
