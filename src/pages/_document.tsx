import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`bg-black text-[20px] font-[400] text-white`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
