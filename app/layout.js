import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '../components/ui/sonner';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Moolah Mate - your smart expenses tracker",
  description: "Your very own smart expenses tracker bff",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
