import Pusher from "pusher";
import {env} from "../env/server.mjs";

export const pusherServerClient = new Pusher({
  appId: env.PUSHER_APP_ID,
  key: env.PUSHER_APP_KEY,
  secret: env.PUSHER_APP_SECRET,
  cluster: env.PUSHER_APP_CLUSTER,
  useTLS: true,
});
