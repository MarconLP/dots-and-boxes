import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import { pusherServerClient } from "../../../server/pusher";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { events } = JSON.parse(req.body);
  const { channel, name }: { channel: string; name: string } = events[0];

  if (!channel.startsWith("presence-")) return res.send({ success: false });

  if (name === "channel_occupied") {
    await prisma.room.create({
      data: {
        roomId: channel.substring(9),
      },
    });
  } else if (name === "channel_vacated") {
    await prisma.room.deleteMany({
      where: {
        roomId: channel.substring(9),
      },
    });
  } else if (name === "member_added") {
    const usersRes = await pusherServerClient.get({
      path: `/channels/${channel}/users`,
    });
    const { users } = await usersRes.json();

    if (users.length >= 2) {
      await pusherServerClient.trigger(
        channel.substring(9),
        "game-start",
        null
      );
    }
  }

  res.send({ success: true });
}
