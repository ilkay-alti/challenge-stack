import { NextResponse } from "next/server";

export function createResponse(
  message: string,
  status: number,
  data: any = null,
) {
  const response = {
    status: status === 200 ? "ok" : "error",
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}
