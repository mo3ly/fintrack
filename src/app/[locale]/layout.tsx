import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/constant/config";
import { getLocaleDirection } from "@/lib/utils";
import { ReactElement } from "react";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ViewTransitions } from "next-view-transitions";

const IBM = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    creator: "@mo3ly",
  },
  authors: [
    {
      name: "Mohamed Aly",
      url: "https://mo3ly.com",
    },
  ],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactElement;
  params: { locale: string };
}) {
  const dir = getLocaleDirection(locale);

  return (
    <ViewTransitions>
      <html lang={locale} dir={dir} suppressHydrationWarning={true}>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1,  maximum-scale=1, user-scalable=0"
          />

          <script
            src="https://beamanalytics.b-cdn.net/beam.min.js"
            data-token="8122eeee-58ff-4438-bb03-5c128cff07fd"
            async></script>
        </head>
        <body
          className={`${IBM.className} bg-background selection:bg-neutral-200 dark:selection:bg-neutral-600`}>
          <TailwindIndicator />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
