import { getDb } from "@/lib/db/prisma";
import { sessionCookieOptions } from "@/lib/session";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const prisma = await getDb();
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "請輸入有效帳密" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await bcrypt.compare(parsed.data.password, user.password))) {
    return NextResponse.json({ error: "帳號或密碼錯誤" }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(sessionCookieOptions(user.id));

  return NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
}
