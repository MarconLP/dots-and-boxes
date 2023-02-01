import { usePusherStatus } from "../utils/pusher";
import { useEffect, useState } from "react";

export default function ConnectState() {
  const [load, setLoad] = useState(false);
  const state = usePusherStatus();

  const getColors = (): string => {
    if (state === "connected")
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (["unavailable", "failed", "disconnected"].includes(state))
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    if (["connecting", "intialized"].includes(state))
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "";
  };

  useEffect(() => {
    setInterval(() => {
      setLoad((x) => !x);
    }, 2000);
  }, []);

  return (
    <div
      className={`fixed top-[30px] right-[30px] mr-2 rounded px-2.5 py-0.5 text-xs font-medium ${getColors()}`}
    >
      <span>{state.toUpperCase()}</span>
    </div>
  );
}
