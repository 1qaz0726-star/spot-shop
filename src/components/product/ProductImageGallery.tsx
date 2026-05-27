"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

type ImageItem = {
  id: string;
  url: string;
  alt?: string | null;
};

type Props = {
  images: ImageItem[];
  alt: string;
  variant?: "desktop" | "mobile";
};

function needsUnoptimized(url: string) {
  return url.startsWith("/api/uploads/");
}

export function ProductImageGallery({ images, alt, variant = "desktop" }: Props) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];
  const isMobile = variant === "mobile";

  const go = useCallback(
    (delta: number) => {
      if (images.length <= 1) return;
      setIndex((i) => (i + delta + images.length) % images.length);
    },
    [images.length]
  );

  if (!images.length) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400",
          isMobile ? "aspect-square" : "aspect-square rounded-2xl"
        )}
      >
        無圖片
      </div>
    );
  }

  return (
    <div>
      <div
        className={cn(
          "relative overflow-hidden bg-white",
          isMobile ? "aspect-square" : "aspect-square rounded-2xl shadow-sm"
        )}
      >
        <Image
          key={current.url}
          src={current.url}
          alt={current.alt || alt}
          fill
          className="object-cover"
          priority
          sizes={isMobile ? "100vw" : "50vw"}
          unoptimized={needsUnoptimized(current.url)}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
              aria-label="上一張"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
              aria-label="下一張"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/40 px-2 py-1">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-4 bg-white" : "w-1.5 bg-white/60"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div
          className={cn(
            "flex gap-2 overflow-x-auto",
            isMobile ? "mt-2 px-1 pb-1" : "mt-4 gap-3"
          )}
        >
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-lg border-2 transition",
                isMobile ? "h-16 w-16" : "h-20 w-20",
                i === index
                  ? "border-[var(--color-brand)] ring-2 ring-indigo-200"
                  : "border-gray-200 opacity-70 hover:opacity-100"
              )}
              aria-label={`查看圖片 ${i + 1}`}
              aria-current={i === index}
            >
              <Image
                src={img.url}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
                unoptimized={needsUnoptimized(img.url)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
