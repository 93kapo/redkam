import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || requestHeaders.get("host") || "redkam.local";
  const forwardedProto = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProto || (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", base).toString();

  return {
    metadataBase: base,
    title: "REDKAM — Production + Execution Unit",
    description:
      "Unidad de producción y ejecución audiovisual especializada en FPV, drone, cámara y postproducción desde Guatemala.",
    applicationName: "REDKAM",
    openGraph: {
      type: "website",
      locale: "es_GT",
      title: "REDKAM — Production + Execution Unit",
      description: "Entramos donde las cámaras no.",
      images: [{ url: socialImage, width: 1731, height: 909, alt: "REDKAM — Entramos donde las cámaras no." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "REDKAM — Production + Execution Unit",
      description: "Entramos donde las cámaras no.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
