import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import { pusherServerClient } from "../../../server/pusher";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { events } = JSON.parse(req.body) as {
    events: [{ channel: string; name: string }];
  };
  const { channel, name } = events[0];

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
    const { users } = (await usersRes.json()) as {
      users: [{ id: string }, { id: string }];
    };

    if (users.length >= 2) {
      await pusherServerClient.trigger(channel.substring(9), "game-start", {
        teams: [
          { user: users[0].id, team: "TeamA" },
          { user: users[1].id, team: "TeamB" },
        ],
      });

      await prisma.room.deleteMany({
        where: {
          roomId: channel.substring(9),
        },
      });
    }
  }

  res.send({ success: true });
}
