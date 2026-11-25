import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alvibot.com"),
  title: "ALVI One — Autonomous Home-Care & Caregiver Companion Robot | Team 43",
  description:
    "ALVI (Autonomous Living & Vitality Intelligence) — Brushed white aluminium indoor companion robot, 5-cylinder hermetic pill carousel, 4x solid-state ToF laser navigation, and real-time smartwatch caregiver telemetry.",
  keywords: [
    "ALVICARE",
    "ALVI",
    "ALVI One",
    "Autonomous Robotics",
    "Home Care",
    "Companion Robot",
    "Medication Dispenser",
    "Fall Detection",
    "Time-of-Flight",
    "VL53L1X",
    "Smartwatch Telemetry",
    "Elderly Care Sri Lanka",
    "Team 43",
    "University of Westminster",
    "Informatics Institute of Technology",
  ],
  authors: [{ name: "Team 43 · ALVICARE Systems", url: "https://alvibot.com" }],
  creator: "Team 43 (UoW & IIT)",
  publisher: "ALVICARE Systems",
  alternates: {
    canonical: "https://alvibot.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/alvicare-app-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "ALVI One — Autonomous Home-Care & Caregiver Companion Robot",
    description:
      "One system, two parts. An indoor companion robot that blends into the home, paired with smartwatch biometrics and caregiver mobile telemetry.",
    url: "https://alvibot.com",
    siteName: "ALVICARE Systems",
    images: [
      {
        url: "/alvicare-logo-preview.png",
        width: 1200,
        height: 630,
        alt: "ALVI One Autonomous Home-Care Companion",
      },
      {
        url: "/images/launch_video_poster.jpg",
        width: 1920,
        height: 1080,
        alt: "ALVI One Cyber-Physical Demonstration & Launch Showcase",
      },
    ],
    type: "website",
    locale: "en_LK",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALVI One — Autonomous Home-Care & Caregiver Companion Robot",
    description:
      "One system, two parts. Autonomous companion robot with 5-cylinder hermetic carousel, 4x ToF laser navigation, and smartwatch caregiver telemetry.",
    images: ["/alvicare-logo-preview.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://alvibot.com/#organization",
      name: "ALVICARE Systems",
      alternateName: ["ALVI", "AlviCare", "Team 43"],
      url: "https://alvibot.com",
      logo: "https://alvibot.com/alvicare-logo-preview.png",
      sameAs: [
        "https://iit-team-v4kklicw.atlassian.net",
        "https://github.com/alvicare",
      ],
      department: {
        "@type": "EducationalOrganization",
        name: "Informatics Institute of Technology & University of Westminster",
        url: "https://www.iit.ac.lk",
      },
    },
    {
      "@type": "Product",
      "@id": "https://alvibot.com/#product",
      name: "ALVI One Autonomous Home-Care Companion Robot",
      description:
        "Autonomous cyber-physical elder companion robot featuring 5-cylinder hermetic carousel pill dispensing, contactless palm thermopile verification, 4x ToF laser navigation, and smartwatch caregiver telemetry.",
      brand: {
        "@type": "Brand",
        name: "ALVICARE",
      },
      image: "https://alvibot.com/alvicare-logo-preview.png",
      offers: {
        "@type": "Offer",
        price: "110950",
        priceCurrency: "LKR",
        availability: "https://schema.org/PreOrder",
        url: "https://alvibot.com/#reserve",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://alvibot.com/#software",
      name: "AlviCare Caregiver Mobile App",
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS, Android, Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "LKR",
      },
    },
    {
      "@type": "VideoObject",
      "@id": "https://alvibot.com/#video",
      name: "ALVI One — Official Master Launch Video & System Demonstration",
      description:
        "Official 41-second demonstration of the ALVI One autonomous companion robot, 5-cylinder hermetic pill dispenser, 4x ToF laser navigation, and smartwatch caregiver telemetry.",
      thumbnailUrl: ["https://alvibot.com/images/launch_video_poster.jpg"],
      uploadDate: "2026-11-23T05:00:00+05:30",
      duration: "PT41S",
      contentUrl: "https://alvibot.com/videos/alvi_launch_video.mp4",
      embedUrl: "https://alvibot.com/videos/alvi_launch_video.mp4",
    },
    {
      "@type": "FAQPage",
      "@id": "https://alvibot.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          "name": "What is ALVI One?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ALVI (Autonomous Living & Vitality Intelligence) is a cyber-physical companion robot and caregiver mobile application designed to support older adults living alone, offering medication dispensing, fall detection, and emergency escalation.",
          },
        },
        {
          "@type": "Question",
          "name": "How does the pill dispensing mechanism verify human intake?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ALVI uses a 5-cylinder hermetic rotary carousel coupled with an MLX90614 Contactless Palm Thermopile sensor (detecting human skin temperature between 32–37.5°C) and IR break-beam detection to ensure medication drops directly into the elder's hand.",
          },
        },
        {
          "@type": "Question",
          "name": "How does ALVI handle emergency falls in Sri Lanka?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ALVI utilizes dual-trigger verification: CareWatch accelerometer impact detection combined with on-robot vision confirmation. It instantly alerts family caregivers with a 60-second first-responder lock, automatically escalating to Sri Lanka's 1990 Suwa Seriya national ambulance service if unacknowledged.",
          },
        },
        {
          "@type": "Question",
          "name": "Is patient video data stored in the cloud?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Under Sri Lanka PDPA No. 9 of 2022 and UK GDPR, all LiveKit WebRTC video calling is ephemeral and peer-to-peer with an on-robot visible 'Watching' indicator. Zero raw video is permanently stored on cloud servers.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} bg-white text-primary selection:bg-slateMist selection:text-slateAccent antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
