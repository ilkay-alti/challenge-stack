import { NextResponse } from "next/server";
import { logger } from "./logger";

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

  if (status === 200) {
    logger.info(message);
  } else {
    logger.error(message);
  }

  return NextResponse.json(response, { status });
}
