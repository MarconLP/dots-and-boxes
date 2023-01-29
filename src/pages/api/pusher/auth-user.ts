import type { NextApiRequest, NextApiResponse } from "next";
import { pusherServerClient } from "../../../server/pusher";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { socket_id } = req.body as { socket_id: string };
  const { auth_key } = req.headers;

  console.log("auth user");

  if (!auth_key || auth_key !== "access_token") {
    console.log(req.headers);
    res.status(404).json({ message: "lol", blob: req.headers });
    return;
  }

  const auth = pusherServerClient.authenticateUser(socket_id, {
    id: auth_key,
    name: "ironman",
  });
  res.send(auth);
}
