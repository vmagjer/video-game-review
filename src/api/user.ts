

export type User = {
  id: number
  email: string
  createdAt: string
  updatedAt: string
}

const mockUser: User = {
  id: 1,
  email: 'user@email.com',
  createdAt: '2021-01-01T00:00:00.000Z',
  updatedAt: '2021-01-01T00:00:00.000Z',
}

export async function getUser(): Promise<User> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockUser
}

export async function updateUser(userId: number, user: Partial<User>): Promise<User> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('updateUser', userId, user);  
  return mockUser
}

export async function deleteUser(): Promise<void> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
}

