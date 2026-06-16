import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Event Studio | Premium Invitation Creator",
  description: "Create stunning event invitations, social media assets, and RSVP pages with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfairDisplay.variable} dark`}
    >
      <body className="min-h-screen font-sans bg-background text-foreground overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
