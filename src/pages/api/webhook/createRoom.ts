import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

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
        roomId: channel.substring(10),
      },
    });
  } else if (name === "channel_vacated") {
    console.log("delete item");
    const del = await prisma.room.deleteMany({
      where: {
        roomId: channel.substring(10),
      },
    });
  }

  res.send({ success: true });
}
