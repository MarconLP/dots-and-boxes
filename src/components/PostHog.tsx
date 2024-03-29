import posthog from "posthog-js";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {env} from "../env/client.mjs";

export default function PostHog() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== undefined) posthog.capture("$pageview");
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== undefined && process.env.NODE_ENV === "production") {
      posthog.init(env.NEXT_PUBLIC_POSTHOG_TOKEN, {
        api_host: "https://eu.posthog.com",
      });
    }
  }, []);

  return <></>;
}
