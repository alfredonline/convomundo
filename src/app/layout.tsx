import type { Metadata } from "next";
import "@/app/globals.css";
import { Footer } from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_BASE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Find ready-to-use conversation topics, questions, vocabulary, and example sentences for language teaching. Browse by language and pick a topic in seconds.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    url: SITE_BASE_URL,
    title: SITE_NAME,
    description:
      "Find ready-to-use conversation topics, questions, vocabulary, and example sentences for language teaching.",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Find ready-to-use conversation topics, questions, vocabulary, and example sentences for language teaching.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
