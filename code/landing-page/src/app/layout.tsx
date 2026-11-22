import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alvibot.com"),
  title: "ALVICARE One — Autonomous Home-Care & Caregiver Companion",
  description:
    "The world's most advanced autonomous home-care companion. Brushed white aluminium indoor unit, 5-cylinder hermetic pill carousel, 4x solid-state Time-of-Flight (ToF) laser navigation, and real-time smartwatch caregiver telemetry.",
  keywords: [
    "ALVICARE",
    "ALVI",
    "ALVI One",
    "Autonomous Robotics",
    "Home Care",
    "Companion Robot",
    "Medication Dispenser",
    "Fall Detection",
    "Time-of-Flight (ToF)",
    "Smartwatch Telemetry",
  ],
  authors: [{ name: "ALVICARE Systems" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/alvicare-app-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  openGraph: {
    title: "ALVICARE One — Autonomous Home-Care & Caregiver Companion",
    description:
      "One system, two parts. An indoor companion robot that blends into the home, paired with a smartwatch and caregiver link.",
    url: "https://alvibot.com",
    siteName: "ALVICARE",
    images: [
      {
        url: "/alvicare-logo-preview.png",
        width: 1200,
        height: 630,
        alt: "ALVICARE One Autonomous Home-Care Companion",
      },
    ],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-primary selection:bg-slateMist selection:text-slateAccent antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
