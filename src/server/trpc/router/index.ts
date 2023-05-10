import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  title: procedure.query(() => 'Create V3 app'),
  getTodos: procedure.query(({ ctx }) => {
    return ctx.db.todo.findMany();
  }),
  createTodo: procedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .mutation(async ({ ctx, input }: any) => {
      const todo = await ctx.db.todo.create({
        data: {
          text: input.text
        }
      });
      return todo;
    }),
  deleteTodo: procedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(async ({ ctx, input }: any) => {
      const deleteTodo = await ctx.db.todo.delete({
        where: {
          id: input.id
        }
      });
      return deleteTodo;
    }),
  updateTodo: procedure
    .input(
      z.object({
        id: z.number(),
        text: z.string()
      })
    )
    .mutation(async ({ ctx, input }: any) => {
      const updateTodo = await ctx.db.todo.update({
        where: {
          id: input.id
        },
        data: {
          text: input.text
        }
      });
      return updateTodo;
    })
});

export type AppRouter = typeof appRouter;
