import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./ui/header";
import Footer from "./ui/footer";
import Sidebar from "./ui/sidebar";
import { AuthProvider } from "./lib/auth";
import { BookmarksProvider } from "./lib/bookmarks";
import { ToastProvider } from "./lib/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | My Blog",
    default: "My Blog",
  },
  description: "A simple blog built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint to avoid a flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme'),d=document.documentElement;if(s==='dark'||(!s&&matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <BookmarksProvider>
            <ToastProvider>
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <main className="min-w-0 flex-1">{children}</main>
              </div>
              <Footer />
            </ToastProvider>
          </BookmarksProvider>
        </AuthProvider>


      </body>
    </html>
  );
}
