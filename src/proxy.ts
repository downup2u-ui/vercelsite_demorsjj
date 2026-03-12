import { NextResponse, userAgent } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(req: NextRequest) {
  const username = process.env.SITE_USER
  const password = process.env.SITE_PASS

  const authHeader = req.headers.get("authorization")

  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown"

  const referer = req.headers.get("referer") || ""

  const path = req.nextUrl.pathname
  const method = req.method

  const time = new Date().toISOString()

  const ua = userAgent(req)

  const browser = ua.browser.name || "unknown"
  const browser_version = ua.browser.version || "unknown"
  const os = ua.os.name || "unknown"
  const device = ua.device.type || "desktop"

  const rawUA = req.headers.get("user-agent") || ""

  let success = false
  let user = "unknown"

  if (authHeader) {
    const token = authHeader.split(" ")[1]

    if (token) {
      const [u, p] = Buffer.from(token, "base64").toString().split(":")

      if (u === username && p === password) {
        success = true
        user = u
      }
    }
  }

  console.log(
    JSON.stringify({
      event: "login_attempt",
      time,
      ip,
      method,
      path,
      browser,
      browser_version,
      os,
      device,
      referer,
      user_agent: rawUA,
      username: user,
      success,
    })
  )

  if (!success) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt).*)"],
}
