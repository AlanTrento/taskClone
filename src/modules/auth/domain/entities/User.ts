export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  birthdate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function createUser(data: Omit<User, 'createdAt' | 'updatedAt'>): User {
  const now = new Date();
  return { ...data, createdAt: now, updatedAt: now };
}

export function updateUser(user: User, updates: Partial<Omit<User, 'id' | 'createdAt'>>): User {
  return { ...user, ...updates, updatedAt: new Date() };
}
