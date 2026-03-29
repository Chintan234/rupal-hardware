import { connectDB } from "@/lib/db";
import Enquiry from "@/lib/models/Enquiry";
import { isAdminAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();

  const [total, newCount, contacted, closed] = await Promise.all([
    Enquiry.countDocuments(),
    Enquiry.countDocuments({ status: "New" }),
    Enquiry.countDocuments({ status: "Contacted" }),
    Enquiry.countDocuments({ status: "Closed" }),
  ]);

  return NextResponse.json({ total, new: newCount, contacted, closed });
}
