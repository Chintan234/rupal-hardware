import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import { isAdminAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

// Public — frontend fetches this
export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(request) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const body = await request.json();

  if (!body.customer || !body.slug) {
    return NextResponse.json({ error: "Customer and slug are required" }, { status: 400 });
  }

  const project = await Project.create(body);
  return NextResponse.json(project, { status: 201 });
}
