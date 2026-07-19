import { NextRequest, NextResponse } from "next/server";

/**
 * Verify an admin request against ADMIN_API_KEY.
 *
 * Fails closed: if ADMIN_API_KEY is not configured in the environment, every
 * request is rejected (503) rather than falling back to any default key.
 *
 * Returns null when the request is authorized, or a NextResponse to return
 * directly when it is not.
 */
export function checkAdminAuth(req: NextRequest): NextResponse | null {
  const expectedKey = process.env.ADMIN_API_KEY;
  if (!expectedKey) {
    return NextResponse.json(
      { error: "Admin API not configured (ADMIN_API_KEY is unset)" },
      { status: 503 }
    );
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${expectedKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
