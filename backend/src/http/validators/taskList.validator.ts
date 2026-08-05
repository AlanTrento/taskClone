import { z } from 'zod';

export const createTaskListSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    color: z.string().min(1, 'Cor é obrigatória'),
  }),
});

export const getByIdTaskListSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const updateTaskListSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    color: z.string().optional(),
    order: z.number().int().optional(),
  }),
});

export const deleteTaskListSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
