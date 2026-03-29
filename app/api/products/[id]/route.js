import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { isAdminAuthenticated } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectDB();
  const product = await Product.findById(params.id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PATCH(request, context) {
  try {
    console.log("PATCH called"); 
    console.log("context:", context);

    if (!isAdminAuthenticated(request)) {
      console.log("Unauthorized access");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Check what params really are
    console.log("Before awaiting params:", context.params);

    const params = await context.params; // unwrap if it's a promise
    console.log("After awaiting params:", params);

    const id = params?.id;
    console.log("Resolved id:", id);

    const body = await request.json();
    console.log("Request body:", body);

    if (!id) {
      console.log("No ID found!");
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    const updated = await Product.findByIdAndUpdate(id, body, { returnDocument: "after" });
    console.log("Updated product:", updated);

    if (!updated) {
      console.log("Product not found");
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH ERROR:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { id } = await context.params;

    console.log("Deleting product ID:", id);

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