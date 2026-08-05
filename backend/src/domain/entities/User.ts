export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  birthdate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): User {
  const now = new Date();
  return {
    id: data.id || '',
    ...data,
    createdAt: now,
    updatedAt: now,
  };
}
