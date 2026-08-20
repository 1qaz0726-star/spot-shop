import { getSession } from "@/lib/session";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  ensureProductsUploadDir,
  getProductsUploadDir,
  getUploadsBucket,
} from "@/lib/upload";
import { Role } from "@prisma/client";
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== Role.SELLER) {
    return NextResponse.json({ error: "需要賣家權限" }, { status: 403 });
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "請選擇圖片檔案" }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json({ error: "僅支援 JPG、PNG、WebP、GIF" }, { status: 400 });
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: "單張圖片不可超過 5MB" }, { status: 400 });
  }

  const ext =
    { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif" }[
      file.type
    ] ?? ".jpg";

  const filename = `${randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const bucket = await getUploadsBucket();

  if (bucket) {
    await bucket.put(`products/${filename}`, buffer, {
      httpMetadata: { contentType: file.type },
    });
  } else {
    await ensureProductsUploadDir();
    await writeFile(path.join(getProductsUploadDir(), filename), buffer);
  }

  const url = `/api/uploads/products/${filename}`;
  return NextResponse.json({ url });
}
