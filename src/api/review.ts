import type { PaginatedList } from "./types"

export type Review = {
  id: number
  title: string
  body: string
  rating: number
  gameId: number
  userId: number
  userName: string
  createdAt: string
  updatedAt: string
}

const mockReviews: Review[] = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, consectetur',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    rating: 5,
    gameId: 1,
    userId: 1,
    userName: 'Nikola Tesla',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
  {
    id: 3,
    title: 'Review 1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    rating: 1,
    gameId: 1,
    userId: 2,
    userName: 'Franc Kafka',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
  {
    id: 4,
    title: 'Review 1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    rating: 7,
    gameId: 1,
    userId: 3,
    userName: 'Pero Peric',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    title: 'Review 2',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    rating: 4,
    gameId: 2,
    userId: 1,
    userName: 'Nikola Tesla',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
]

export async function list(gameId: number, page: number, perPage: number): Promise<PaginatedList<Review>> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    data: mockReviews.filter(review => review.gameId === gameId).slice((page - 1) * perPage, page * perPage),
    total: mockReviews.filter(review => review.gameId === gameId).length,
    next: null,
    previous: null,
  }
}


export async function create(review: Review): Promise<Review> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  mockReviews.push(review)
  return review
}

export async function update(reviewId: number, review: Partial<Review>): Promise<Review> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  const mReview = mockReviews.find(mReview => mReview.id === reviewId)!
  Object.assign(mReview, review)
  return mReview
}

export async function remove(reviewId: number): Promise<void> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockReviews.findIndex(mReview => mReview.id === reviewId)
  mockReviews.splice(index, 1)
}

export async function get(reviewId: number): Promise<Review> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockReviews.find(mReview => mReview.id === reviewId)!
}

