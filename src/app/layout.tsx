import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "JobZy - Track Job Applications & Interviews in One Place",
  description: "JobZy helps students and developers track job applications, interviews, notes, and follow-ups. Organize your job search without spreadsheets or confusion. Join early access today.",
  keywords: ["job tracking", "interview planner", "job application tracker", "career management", "job search tool"],
  authors: [{ name: "JobZy" }],
  openGraph: {
    title: "JobZy - Track Job Applications & Interviews",
    description: "Centralized job application tracking and interview management for students and developers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JobZy",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "JobZy helps students and developers track job applications, interviews, notes, and follow-ups. Organize your job search without spreadsheets or confusion.",
    "url": "https://jobzy.in",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "description": "Free tier available"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "JobZy",
      "url": "https://jobzy.in"
    },
    "featureList": [
      "Job Application Tracking",
      "Interview Calendar",
      "ATS Score Checker",
      "Resume-JD Matcher",
      "Resume Versioning",
      "AI Resume Builder",
      "Smart Reminders"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jakarta.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
