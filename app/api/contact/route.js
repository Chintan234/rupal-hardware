export async function POST(request) {
  const body = await request.json();

  console.log("New Inquiry Received:");
  console.log(body);

  return new Response(
    JSON.stringify({ message: "Inquiry submitted successfully!" }),
    { status: 200 }
  );
}