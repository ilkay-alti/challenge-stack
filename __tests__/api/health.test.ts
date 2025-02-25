import { createMocks } from "node-mocks-http";
import { GET } from "@/app/api/health/route";

describe("/api/health Endpoint Testleri", () => {
  beforeAll(() => {});

  test("GET isteği geçerli response dönmeli", async () => {
    const { req } = createMocks({
      method: "GET",
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      status: "ok",
      timestamp: expect.any(String),
    });
  });

  test("Hatalı method için 405 dönmeli", async () => {
    const { req } = createMocks({
      method: "POST",
    });

    const response = await GET(req);
    expect(response.status).toBe(405);
  });
});
