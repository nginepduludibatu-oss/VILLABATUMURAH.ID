import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VillaBatuMurah.ID - Villa Murah di Batu & Malang",
  description: "Temukan villa terbaik dengan harga terjangkau di Batu dan Malang. Fasilitas lengkap, lokasi strategis, dan pelayanan terpercaya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen font-sans antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}