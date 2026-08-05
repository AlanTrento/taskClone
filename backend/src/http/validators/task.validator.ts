import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().optional(),
    listId: z.string().min(1, 'Lista é obrigatória'),
    order: z.number().int().optional(),
  }),
});

export const getByIdTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    starred: z.boolean().optional(),
    starredAt: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    dueDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    dueTime: z.string().optional(),
    order: z.number().int().optional(),
  }),
});

export const deleteTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const deleteCompletedSchema = z.object({
  params: z.object({
    listId: z.string().min(1),
  }),
});

export const markOldSchema = z.object({
  params: z.object({
    listId: z.string().min(1),
  }),
  query: z.object({
    olderThanDays: z.coerce.number().int().min(1).default(30),
  }),
});
