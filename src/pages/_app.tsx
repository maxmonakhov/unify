import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { MuseoModerno } from "next/font/google";

const museoModerno = MuseoModerno({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`flex min-h-screen flex-col ${museoModerno.className}`}>
      <Component {...pageProps} />
    </div>
  );
}
