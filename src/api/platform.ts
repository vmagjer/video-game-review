
export type Platform = {
  id: number
  name: string
}

export const mockPlatforms: Platform[] = [
  {
    id: 1,
    name: 'Platform 1',
  },
  {
    id: 2,
    name: 'Platform 2',
  },
  {
    id: 3,
    name: 'Platform 3',
  },
]

export async function list(): Promise<Platform[]> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockPlatforms
}