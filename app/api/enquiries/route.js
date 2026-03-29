import { connectDB } from "@/lib/db";
import Enquiry from "@/lib/models/Enquiry";
import { isAdminAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const query = {};
  if (status && status !== "All") query.status = status;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
  return NextResponse.json(enquiries);
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();

  if (!body.name || !body.phone) {
    return NextResponse.json(
      { error: "Name and phone are required" },
      { status: 400 }
    );
  }

  const enquiry = await Enquiry.create(body);
  return NextResponse.json(enquiry, { status: 201 });
}
