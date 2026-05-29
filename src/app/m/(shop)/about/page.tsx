import { AboutView } from "@/components/brand/AboutView";
import { MobileHeader } from "@/components/mobile/MobileHeader";

export default function MobileAboutPage() {
  return (
    <>
      <MobileHeader title="關於我們" showBack backHref="/m" showAccount={false} />
      <AboutView platform="mobile" />
    </>
  );
}
