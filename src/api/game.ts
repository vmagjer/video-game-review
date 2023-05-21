import { mockGenres, type Genre } from "./genre"
import { mockReviews, type Review } from "./review"


export type Platform = {
  id: number
  name: string
}
export type Game = {
  id: number
  name: string
  publishedDate: string
  creatorStudio: string
  description: string
  platforms: Platform[]
  genres: Genre[]
}

export type GameDetails = Game & {
  reviews: Review[]
}



const mockGames: Game[] = [
  {
    id: 1,
    name: 'Lorem ipsum dolor sit amet',
    publishedDate: '2021-01-01T00:00:00.000Z',
    creatorStudio: 'Studio 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    platforms: [
      {
        id: 1,
        name: 'Platform 1',
      },
      {
        id: 2,
        name: 'Platform 2',
      },
    ],
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
        id: 3,
        name: 'Genre 3',
      }
    ],
  },
  {
    id: 2,
    name: 'Lorem ipsum dolor sit amet 2',
    publishedDate: '2021-01-01T00:00:00.000Z',
    creatorStudio: 'Studio 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    platforms: [
      {
        id: 1,
        name: 'Platform 1',
      },
    ],
    genres: [
      {
        id: 1,
        name: 'Genre 1',
      },
      {
        id: 2,
        name: 'Genre 2',
      },
    ],
  },
]


export async function list(): Promise<Game[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockGames
}

export async function listByGenre(genreId: number): Promise<Game[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockGames.filter(game => game.genres.find(genre => genre.id === genreId))
}

export async function listByPlatform(platformId: number): Promise<Game[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockGames.filter(game => game.platforms.find(platform => platform.id === platformId))
}

export async function find(id: number): Promise<GameDetails> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return  {
    id: id,
    name: 'Lorem ipsum dolor sit amet',
    publishedDate: '2021-01-01T00:00:00.000Z',
    creatorStudio: 'Studio 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    platforms: [
      {
        id: 1,
        name: 'Platform 1',
      },
      {
        id: 2,
        name: 'Platform 2',
      },
    ],
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
        id: 3,
        name: 'Genre 3',
      }
    ],
    reviews: mockReviews,    
  }
}

export type NewGame = Omit<Game, 'id' | 'publishedDate'>
export async function create(game: NewGame): Promise<Game> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  if (game.genres.length) {
    game.genres.forEach(genre => {
      if (!mockGenres.find(mGame => mGame.id === genre.id)) {
        mockGenres.push(genre)
      }
    })
  }

  mockGames.push({
    ...game,
    id: mockGames.length + 1,
    publishedDate: new Date().toISOString(),
  })

  return mockGames[mockGames.length - 1]
}

export async function update(game: Game): Promise<Game> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('updateGame', game);
  const index = mockGames.findIndex(mGame => mGame.id === game.id)
  mockGames[index] = game
  return mockGames[index]
}

export async function remove(gameId: number): Promise<void> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockGames.findIndex(game => game.id === gameId)
  mockGames.splice(index, 1)
}

