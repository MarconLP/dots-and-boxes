import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { pusherServerClient } from "../../pusher";

export const roomRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.room.findMany();
  }),

  gameEvent: publicProcedure
    .input(
      z.object({ channel: z.string(), team: z.string(), line: z.number() })
    )
    .mutation(async ({ input, ctx }) => {
      await pusherServerClient.trigger(input.channel, "game-event", {
        team: input.team,
        line: input.line,
      });
      return "OK";
    }),
});
