import { useRouter } from "next/router";

export default function Index() {
  const { push } = useRouter();

  setTimeout(() => {
    void push("install");
  }, 3000);

  // return <Main />;
  return <p>Checking status...</p>;
}
