"use client";

import { apiErrorMessage, asJsonRecord, cn } from "@/lib/utils";
import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
};

export function ProductImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);

    const next = [...value];
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = asJsonRecord(await res.json());
        if (!res.ok) {
          alert(apiErrorMessage(data, "上傳失敗"));
          continue;
        }
        if (typeof data.url === "string") next.push(data.url);
      }
      onChange(next);
    } finally {
      setUploading(false);
    }
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {value.map((url, i) => (
          <div
            key={`${url}-${i}`}
            className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
          >
            <Image src={url} alt="" fill className="object-cover" sizes="96px" unoptimized />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute right-1 top-1 rounded-full bg-black/50 p-0.5 text-white hover:bg-black/70"
              aria-label="移除圖片"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        <label
          className={cn(
            "flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 transition hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-light)] hover:text-[var(--color-brand)]",
            uploading && "pointer-events-none opacity-60"
          )}
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <ImagePlus className="h-6 w-6" />
              <span className="mt-1 text-[10px]">上傳</span>
            </>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      <p className="text-xs text-gray-500">支援 JPG、PNG、WebP、GIF，單張最大 5MB，可選多張</p>
    </div>
  );
}
