import "./globals.css";
import { Red_Hat_Display } from "next/font/google";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import { NextAuthProvider } from "./providers";

const tajawal = Red_Hat_Display({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "SEMUSPAR",
  description: "Manejo de Estudiantes & Instrumentos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={tajawal.className}>
        <div className="min-h-screen">
          {/* @ts-expect-error Server Component */}
          <Menu />
          <NextAuthProvider>
            <div className="min-h-[84.5vh] flex mb-8">{children}</div>
          </NextAuthProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
