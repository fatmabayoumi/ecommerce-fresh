import type { Metadata } from "next";
import { Encode_Sans_Expanded } from "next/font/google";
import "./globals.css";
import Navbar from "./_component/Navbar";
import Footer from "./_component/Footer";
import NextauthProvider from "@/providers/components/Nextauth.Provider";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Providers from "../providers/components/ReactQuairyproviders.provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorBoundary } from "./_component/ErrorBoundary";
import RemoveExtensionAttributes from "./RemoveExtensionAttributes";

const encode = Encode_Sans_Expanded({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FreshCart - Modern Ecommerce Platform",
  description: "Shop the latest products with FreshCart",
  keywords: ["ecommerce", "shopping", "products", "online store"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${encode.className} antialiased bg-gray-50`}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <RemoveExtensionAttributes />
          <Providers>
            <NextauthProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-6 md:px-6 lg:px-8">
                  {children}
                </main>
                <Footer />
              </div>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </NextauthProvider>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
