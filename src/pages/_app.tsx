import type { AppProps } from "next/app";
import "../app/globals.css";
import { Geist } from "next/font/google";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={geistSans.className}>
      <Component {...pageProps} />
    </div>
  );
}
