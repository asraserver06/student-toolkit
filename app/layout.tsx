import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/components/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — CGPA & Merit Calculators for Pakistani Students`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free CGPA calculator and Pakistan university merit aggregate calculator for NUST, FAST, PU, UET Lahore, and GIKI. No signup, instant results.",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — CGPA & Merit Calculators for Pakistani Students`,
    description:
      "Free CGPA calculator and Pakistan university merit aggregate calculator for NUST, FAST, PU, UET Lahore, and GIKI.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — CGPA & Merit Calculators`,
    description:
      "Free CGPA and university merit calculators for Pakistani CS and engineering students.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
