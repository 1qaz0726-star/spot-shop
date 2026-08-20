import { getProductsUploadDir, getUploadsBucket } from "@/lib/upload";
import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

type Params = { params: Promise<{ path: string[] }> };

export async function GET(_req: Request, { params }: Params) {
  const { path: segments } = await params;
  if (!segments?.length || segments[0] !== "products") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const safe = segments.slice(1).join("/");
  if (!safe || safe.includes("..")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const ext = path.extname(safe).toLowerCase();
  const headers = {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "Cache-Control": "public, max-age=31536000, immutable",
  };

  const bucket = await getUploadsBucket();
  if (bucket) {
    const object = await bucket.get(`products/${safe}`);
    if (!object) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const data = await object.arrayBuffer();
    return new NextResponse(data, {
      headers: {
        "Content-Type": object.httpMetadata?.contentType || headers["Content-Type"],
        "Cache-Control": headers["Cache-Control"],
      },
    });
  }

  const filePath = path.join(getProductsUploadDir(), safe);
  try {
    const data = await readFile(filePath);
    return new NextResponse(data, { headers });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
