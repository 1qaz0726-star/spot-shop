import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const mode = form.get("mode");
  const res = NextResponse.redirect(new URL(mode === "mobile" ? "/m" : "/", req.url));

  if (mode === "mobile") {
    res.cookies.set("force_mobile", "1", { path: "/", maxAge: 86400 });
    res.cookies.delete("force_desktop");
  } else {
    res.cookies.set("force_desktop", "1", { path: "/", maxAge: 86400 });
    res.cookies.delete("force_mobile");
  }

  return res;
}
