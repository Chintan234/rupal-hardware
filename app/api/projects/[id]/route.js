import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import { isAdminAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

// ✅ GET
export async function GET(request, { params }) {
  await connectDB();

  const { id } = await params;   // ✅ FIX

  const project = await Project.findById(id).lean();

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

// ✅ PATCH
export async function PATCH(request, { params }) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await params;   // ✅ FIX
  const body = await request.json();

  const project = await Project.findByIdAndUpdate(id, body, {
    returnDocument: "after",     // ✅ FIX
  });

  return NextResponse.json(project);
}

// ✅ DELETE
export async function DELETE(request, { params }) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await params;

  await Project.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}