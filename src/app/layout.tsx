import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your E-commerce Store",
  description: "Shop the latest products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow container mx-auto px-4 py-8">
            <Header />
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
