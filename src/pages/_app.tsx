import type { AppProps } from "next/app";
import "../app/globals.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-brand-sans" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={outfit.className}>
      <Component {...pageProps} />
    </div>
  );
}
