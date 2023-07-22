import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MuseoModerno } from "next/font/google";

import SafeProvider from "@safe-global/safe-apps-react-sdk";
import { OpenAppInGnosisStub } from "features";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const museoModerno = MuseoModerno({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`flex min-h-screen flex-col ${museoModerno.className}`}>
      <QueryClientProvider client={queryClient}>
        <SafeProvider loader={<OpenAppInGnosisStub />}>
          <Component {...pageProps} />
        </SafeProvider>
      </QueryClientProvider>
      <Toaster />
    </div>
  );
}
