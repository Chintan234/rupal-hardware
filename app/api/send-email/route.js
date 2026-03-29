import { NextResponse } from "next/server";

const EMAILJS_API = "https://api.emailjs.com/api/v1.0/email/send";

export async function POST(request) {
  try {
    // Parse incoming JSON
    const { templateId, templateParams } = await request.json();
    console.log("Received request body:", { templateId, templateParams });

    // Validate required fields
    if (!templateId || !templateParams) {
      console.warn("Missing templateId or templateParams");
      return NextResponse.json(
        { error: "Missing templateId or templateParams" },
        { status: 400 }
      );
    }

    // Construct payload
    const payload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: process.env.EMAILJS_PUBLIC_KEY,   // server-side public key
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: templateParams,
    };

    console.log("Sending payload to EmailJS:", payload);

    // Make API request
    const res = await fetch(EMAILJS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Log response status
    console.log("EmailJS response status:", res.status);

    // If not ok, log the response body for debugging
    if (!res.ok) {
      const text = await res.text();
      console.error("EmailJS error response:", text);
      return NextResponse.json({ error: "Email send failed", details: text }, { status: 500 });
    }

    console.log("EmailJS sent successfully!");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error in /api/send-email:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}