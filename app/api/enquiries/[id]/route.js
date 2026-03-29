import { connectDB } from "@/lib/db";
import Enquiry from "@/lib/models/Enquiry";
import { isAdminAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const enquiry = await Enquiry.findById(params.id);
  if (!enquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(enquiry);
}

export async function PATCH(request, { params }) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const body = await request.json();
  const enquiry = await Enquiry.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(enquiry);
}

export async function DELETE(request, { params }) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  await Enquiry.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
