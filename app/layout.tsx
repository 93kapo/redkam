import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "REDKAM — Aftermovie, Documental, Foto, FPV y Drone",
  description:
    "Portafolio audiovisual de REDKAM: aftermovie, documental, fotografía, FPV y drone desde Guatemala.",
  applicationName: "REDKAM",
  openGraph: {
    type: "website",
    locale: "es_GT",
    title: "REDKAM — Aftermovie, Documental, Foto, FPV y Drone",
    description: "Aftermovie • Documental • Foto • FPV • Drone",
  },
  twitter: {
    card: "summary_large_image",
    title: "REDKAM — Aftermovie, Documental, Foto, FPV y Drone",
    description: "Aftermovie • Documental • Foto • FPV • Drone",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
