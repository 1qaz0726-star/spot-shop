"use client";

import { useEffect, useState } from "react";

const MQ = "(max-width: 767px)";

/** /zh-TW 洽談站依螢幕寬度套用 mobile / desktop 排版 */
export function useBrandPlatform() {
  const [platform, setPlatform] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    const mq = window.matchMedia(MQ);
    const sync = () => setPlatform(mq.matches ? "mobile" : "desktop");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return platform;
}
