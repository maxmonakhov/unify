import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MuseoModerno } from "next/font/google";

import SafeProvider from "@gnosis.pm/safe-apps-react-sdk";
import { OpenAppInGnosisStub } from "features";

const museoModerno = MuseoModerno({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`flex min-h-screen flex-col ${museoModerno.className}`}>
      <SafeProvider loader={<OpenAppInGnosisStub />}>
        <Component {...pageProps} />
      </SafeProvider>
    </div>
  );
}
