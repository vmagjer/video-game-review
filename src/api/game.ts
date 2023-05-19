import { mockGenres, type Genre } from "./genre"
import type { PaginatedList } from "./types"

export type Game = {
  id: number
  name: string
  image: string
  rating: number
  numReviews: number
  description: string
  genres: Genre[]
  createdAt: string
  updatedAt: string
}



const mockGames: Game[] = [
  {
    id: 1,
    name: 'Lord of the very long name that is very long and has a very long name 1',
    image: 'http://unsplash.it/250/100?random&gravity=center',
    rating: 4,
    numReviews: 3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    genres: [
      {
        id: 1,
        name: 'Genre 1',
      },
      {
        id: 2,
        name: 'Genre 2',
      },
      {
        id: 2,
        name: 'Genre 2',
      },
      {
        id: 2,
        name: 'Genre 2',
      },
    ],
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Game 2',
    image: 'http://unsplash.it/250/100??random&gravity=center',
    rating: 3,
    numReviews: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
    genres: [
      {
        id: 1,
        name: 'Genre 1',
      },
      {
        id: 3,
        name: 'Genre 3',
      },
    ],
  },
]

type SearchParams = {
  query?: string
  genres?: number[]
}

export async function list(page: number, itemsPerPage: number, searchParams: SearchParams): Promise<PaginatedList<Game>> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  const filteredGames = mockGames.filter(game => {
    const hasQuery = searchParams.query ? game.name.toLowerCase().includes(searchParams.query.toLowerCase()) : true
    const hasGenre = searchParams.genres ? searchParams.genres.every(genre => game.genres.some(gameGenre => gameGenre.id === genre)) : true
    return hasQuery && hasGenre
  })
  return {
    data: filteredGames,
    total: filteredGames.length,
    next: null,
    previous: null,
  }
}

export async function find(id: number): Promise<Game> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockGames.find(mGame => mGame.id === id)!
}

export async function create(game: Game): Promise<Game> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  if (game.genres.length) {
    game.genres.forEach(genre => {
      if (!mockGenres.find(mGame => mGame.id === genre.id)) {
        mockGenres.push(genre)
      }
    })
  }

  mockGames.push(game)

  return game
}

export async function update(gameId: number, game: Partial<Game>): Promise<Game> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('updateGame', gameId, game);
  const index = mockGames.findIndex(mGame => mGame.id === gameId)
  return mockGames[index]
}

export async function del(id: number): Promise<void> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockGames.findIndex(game => game.id === id)
  mockGames.splice(index, 1)
}

