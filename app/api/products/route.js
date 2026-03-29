import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { isAdminAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(request) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const body = await request.json();

  if (!body.title || !body.slug || !body.brand || !body.category || !body.sku) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const product = await Product.create(body);
  return NextResponse.json(product, { status: 201 });
}
