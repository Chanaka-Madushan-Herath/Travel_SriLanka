"use client";

import { SiteProvider, useSite } from "@/context/SiteContext";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { usePathname } from "next/navigation";
import { BackToTop, ScrollProgress } from "./ui";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <SiteProvider>
      <Frame>{children}</Frame>
    </SiteProvider>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  const { usingDraft, clearDraftOnly, t } = useSite();
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-foam focus:px-4 focus:py-2"
      >
        {t.skip}
      </a>
      {usingDraft ? (
        <div className="bg-gold-soft px-4 py-2 text-center text-sm text-ink">
          <span>{t.previewBanner}</span>{" "}
          <button
            type="button"
            className="font-semibold underline"
            onClick={() => {
              if (window.confirm(t.previewBanner)) clearDraftOnly();
            }}
          >
            {t.clearPreview}
          </button>
        </div>
      ) : null}
      <ScrollProgress />
      <Header />
      <main key={pathname} id="content" className="page-in flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop label={t.backToTop} />
    </div>
  );
}
