import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { isAdminAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

// ✅ GET
export async function GET(request, { params }) {
  await connectDB();

  const { id } = await params;   // ✅ FIX

  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// ✅ PATCH
export async function PATCH(request, { params }) {
  try {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;   // ✅ CLEAN (no need for context + logs)

    const body = await request.json();

    const updated = await Product.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    });

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH ERROR:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// ✅ DELETE
export async function DELETE(request, { params }) {
  try {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}