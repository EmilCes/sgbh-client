import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/utils/auth";

export const metadata: Metadata = {
  title: "SGBH",
  description: "Sistema para la FEI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
