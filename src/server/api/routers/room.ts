import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { pusherServerClient } from "../../pusher";

export const roomRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.room.findMany();
  }),

  updateCount: publicProcedure.query(async ({ input, ctx }) => {
    await pusherServerClient.trigger("presence-lobby", "my-event", {
      message: "hello world",
    });

    await ctx.prisma.room.upsert({
      where: { id: 1 },
      update: { email: "alice@prisma.io" },
      create: { email: "alice@prisma.io" },
    });

    return "OK";
  }),
});
