import type { NextApiRequest, NextApiResponse } from "next";
import { pusherServerClient } from "../../../server/pusher";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { channel_name, socket_id } = req.body as {
    channel_name: string;
    socket_id: string;
  };
  const { auth_key } = req.headers;

  if (!auth_key || auth_key !== "access_token") {
    console.log(req.headers);
    res.status(404).json({ message: "lol", blob: req.headers });
    return;
  }

  const auth = pusherServerClient.authorizeChannel(socket_id, channel_name, {
    user_id: req.headers.username as string,
    user_info: {
      name: "superman",
    },
  });
  res.send(auth);
}
