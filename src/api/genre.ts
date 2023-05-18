
export type Genre = {
  id: number
  name: string
}

export const mockGenres: Genre[] = [
  {
    id: 1,
    name: 'Genre 1',
  },
  {
    id: 2,
    name: 'Genre 2',
  },
  {
    id: 3,
    name: 'Genre 3',
  },
]

export async function list(): Promise<Genre[]> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockGenres
}