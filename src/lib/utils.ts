import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function asJsonRecord(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" ? (data as Record<string, unknown>) : {};
}

export function apiErrorMessage(data: unknown, fallback: string): string {
  const err = asJsonRecord(data).error;
  return typeof err === "string" && err.trim() ? err : fallback;
}

export function formatPrice(amount: number): string {
  return `NT$ ${amount.toLocaleString("zh-TW")}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || `item-${Date.now()}`;
}

export function generateOrderNo(): string {
  const d = new Date();
  const pad = (n: number, len = 2) => String(n).padStart(len, "0");
  return `ORD${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
