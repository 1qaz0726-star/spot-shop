import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import type { Role } from "@prisma/client";
import { cache } from "react";

const COOKIE = "spot_shop_session";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

/** 同一請求內只查一次 DB，避免 Header + 頁面重複查詢 */
export const getSession = cache(async (): Promise<SessionUser | null> => {
  const jar = await cookies();
  const userId = jar.get(COOKIE)?.value;
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true },
  });
  return user;
});

export async function requireSession(role?: Role): Promise<SessionUser> {
  const user = await getSession();
  if (!user) throw new Error("UNAUTHORIZED");
  if (role && user.role !== role) throw new Error("FORBIDDEN");
  return user;
}

export function sessionCookieOptions(userId: string) {
  return {
    name: COOKIE,
    value: userId,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
