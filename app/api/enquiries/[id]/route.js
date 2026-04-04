import { connectDB } from "@/lib/db";
import Enquiry from "@/lib/models/Enquiry";
import { isAdminAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await params;   // ✅ FIX

  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(enquiry);
}

export async function PATCH(request, { params }) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await params;   // ✅ FIX
  const body = await request.json();

  const enquiry = await Enquiry.findByIdAndUpdate(id, body, {
    returnDocument: "after",     // ✅ FIX (mongoose warning)
  });

  return NextResponse.json(enquiry);
}

export async function DELETE(request, { params }) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await params;   // ✅ FIX

  await Enquiry.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}