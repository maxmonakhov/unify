import { Step } from "@/uikit/stepper/Stepper";
import { Main } from "features";

export default function Home() {
  const steps: Step[] = [
    { name: "Install Unify module" },
    { name: "Polygon ZkVM" },
    { name: "Polygon ZkVM" },
    { name: "Mantle" }
  ];

  return <>{<Main />}</>;
}
