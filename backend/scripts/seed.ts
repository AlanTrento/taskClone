import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../src/config/env.js';

const MONGO_URI = env.MONGO_URI;

interface SeedUser {
  name: string;
  email: string;
  password: string;
}

interface SeedTaskList {
  name: string;
  color: string;
  order: number;
}

interface SeedTask {
  title: string;
  description?: string;
  completed: boolean;
  starred: boolean;
  dueDate?: Date;
  dueTime?: string;
  starredAt?: Date;
  order: number;
}

const users: SeedUser[] = [
  { name: 'Alan', email: 'admin@test.com', password: 'Admin@123' },
];

const taskLists: SeedTaskList[] = [
  { name: 'Minhas tarefas', color: '#8ab4f8', order: 0 },
  { name: 'Trabalho', color: '#81c995', order: 1 },
  { name: 'Pessoal', color: '#f28b82', order: 2 },
];

const tasksByList: Record<number, SeedTask[]> = {
  0: [
    { title: 'Implementar autenticação', description: 'Criar sistema de login', completed: false, starred: true, dueDate: new Date('2024-02-15'), dueTime: '09:00', starredAt: new Date('2024-01-16'), order: 0 },
    { title: 'Configurar banco de dados', description: 'PostgreSQL', completed: true, starred: false, order: 1 },
    { title: 'Criar API REST', description: 'Endpoints principais', completed: false, starred: false, dueDate: new Date('2024-01-30'), order: 2 },
    { title: 'Implementar testes', description: 'Unit e integration', completed: false, starred: true, starredAt: new Date('2024-01-17'), order: 3 },
    { title: 'Documentar endpoints', description: 'Swagger/OpenAPI', completed: true, starred: false, order: 4 },
  ],
  1: [
    { title: 'Reunião de planejamento', description: 'Sprint planning', completed: false, starred: true, dueDate: new Date('2024-01-20'), dueTime: '14:00', starredAt: new Date('2024-01-19'), order: 0 },
    { title: 'Code review', description: 'Revisar PRs do time', completed: false, starred: false, order: 1 },
  ],
  2: [
    { title: 'Comprar presentes', description: 'Aniversário da mãe', completed: false, starred: true, dueDate: new Date('2024-01-25'), dueTime: '10:30', starredAt: new Date('2024-01-22'), order: 0 },
    { title: 'Agendar consulta', description: 'Checkup anual', completed: false, starred: false, order: 1 },
  ],
};

async function seed(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await mongoose.connection.db!.dropDatabase();
    console.log('Database dropped');

    // Create users
    const hashedUsers = await Promise.all(
      users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      })),
    );

    const userDocs = await mongoose.connection.db!.collection('users').insertMany(hashedUsers);
    const userId = Object.values(userDocs.insertedIds)[0];
    console.log(`Created ${users.length} users`);

    // Create task lists
    const listDocs = await mongoose.connection.db!.collection('tasklists').insertMany(
      taskLists.map((tl) => ({
        ...tl,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );

    const listIds = Object.values(listDocs.insertedIds);
    console.log(`Created ${taskLists.length} task lists`);

    // Create tasks
    let totalTasks = 0;
    for (const [listIndex, tasks] of Object.entries(tasksByList)) {
      const listId = listIds[Number(listIndex)];
      await mongoose.connection.db!.collection('tasks').insertMany(
        tasks.map((t) => ({
          ...t,
          listId,
          userId,
          createdAt: new Date(`2024-01-${10 + t.order}`),
          updatedAt: new Date(`2024-01-${12 + t.order}`),
        })),
      );
      totalTasks += tasks.length;
    }
    console.log(`Created ${totalTasks} tasks`);

    console.log('\nSeed completed successfully!');
    console.log('\nMock credentials:');
    console.log('  Email: admin@test.com');
    console.log('  Password: Admin@123');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
