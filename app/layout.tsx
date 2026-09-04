import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#083344",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pearldental.ug"),
  title: {
    default: "Pearl Dental & Implant Clinic | Kololo, Kampala",
    template: "%s | Pearl Dental Clinic",
  },
  description:
    "Gentle, honest private dental care in Kampala, Uganda. Specialized in painless teeth cleanings, dental implants, root canals, fluorosis treatment, and pediatric dentistry on Acacia Avenue, Kololo.",
  keywords: [
    "dental clinic kampala",
    "dentist kololo",
    "teeth cleaning uganda",
    "dental implants kampala",
    "pearl dental uganda",
    "pain free dentist kampala",
    "fluorosis treatment uganda",
    "orthodontics kampala",
  ],
  authors: [{ name: "Pearl Dental & Implant Clinic" }],
  creator: "Pearl Dental",
  publisher: "Pearl Dental",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: "https://pearldental.ug",
    siteName: "Pearl Dental & Implant Clinic",
    title: "Pearl Dental & Implant Clinic | Kololo, Kampala",
    description:
      "Gentle, honest private dental care in Kampala, Uganda. Modern equipment, transparent fees, and compassionate dental surgery in Kololo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pearl Dental & Implant Clinic | Kololo, Kampala",
    description:
      "Gentle, honest private dental care in Kampala, Uganda. Pain-free treatment, experienced clinicians on Acacia Avenue.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Pearl Dental & Implant Clinic",
  description:
    "Gentle, honest private dental care in Kampala, Uganda. Pain-free cleanings, implants, cosmetic restorations, and pediatric dentistry on Acacia Avenue, Kololo.",
  telephone: "+256 700 123 456",
  email: "care@pearldental.ug",
  url: "https://pearldental.ug",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 14 Acacia Avenue, Kololo",
    addressLocality: "Kampala",
    addressCountry: "UG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 0.3341,
    longitude: 32.5899,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "15:00",
    },
  ],
  priceRange: "$$",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/google-sans-2"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-cyan-100 selection:text-cyan-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#083344] text-white px-4 py-2.5 rounded-lg font-semibold text-sm shadow-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-400"
        >
          Skip to main content
        </a>
        {children}

        {/* Portfolio Demo Watermark Badge */}
        <aside
          aria-label="Portfolio Demonstration Notice"
          className="fixed bottom-3 right-3 z-50 pointer-events-auto"
        >
          <div className="bg-[#083344]/95 text-white backdrop-blur-md px-3.5 py-2 rounded-full border border-cyan-400/40 shadow-xl flex items-center gap-2.5 text-[11px] font-medium tracking-tight hover:bg-[#083344] transition-colors">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" aria-hidden="true" />
            <span className="font-semibold text-cyan-200">DEMO SITE</span>
            <span className="text-cyan-600">·</span>
            <span className="text-slate-200">Built by</span>
            <a
              href="mailto:contact@bracketdevwebsites"
              className="text-cyan-300 font-bold hover:text-white underline underline-offset-2 transition-colors"
            >
              contact@bracketdevwebsites
            </a>
            <span className="text-cyan-600">·</span>
            <a
              href="https://wa.me/256776220336"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 font-bold hover:text-white underline underline-offset-2 transition-colors"
            >
              WA: 0776220336
            </a>
          </div>
        </aside>
      </body>
    </html>
  );
}
