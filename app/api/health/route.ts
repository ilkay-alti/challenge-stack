import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
