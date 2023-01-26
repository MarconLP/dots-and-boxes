import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const roomRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const rooms = await ctx.prisma.room.findMany();
    return rooms;
  }),

  createRoom: publicProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log(input.username);
      await ctx.prisma.room.create({
        data: {
          author: input.username,
        },
      });

      return "OK";
    }),
});
