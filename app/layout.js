import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Moolah Mate - your smart expenses tracker",
  description: "your smart expenses tracker bff",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
