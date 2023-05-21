type User = {
  id: number
  username: string
  firstName: string
  email: string
}
export type Review = {
  id: number
  review: string
  rating: number
  gameId: number
  user: User
}

export const mockReviews: Review[] = [
  {
    id: 1,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    rating: 5,
    gameId: 1,
    user: {
      id: 1,
      username: 'Nikola Tesla',
      firstName: 'Nikola',
      email: 'nikola.tesla@email.com',
    },
  },
  {
    id: 3,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    rating: 1,
    gameId: 1,
    user: {
      id: 2,
      username: 'John Doe',
      firstName: 'John',
      email: 'j.d.@email.com',
    },
  },
  {
    id: 4,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    rating: 7,
    gameId: 1,
    user: {
      id: 3,
      username: 'Jane Doe',
      firstName: 'Jane',
      email: 'j.d.@email.com',
    },
  },
  {
    id: 2,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet enim, vitae aliquam ni',
    rating: 4,
    gameId: 2,
    user: {
      id: 1,
      username: 'Nikola Tesla',
      firstName: 'Nikola',
      email: 'nikola.tesla@email.com',
    },
  },
]

export async function list(gameId: number): Promise<Review[]> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockReviews.filter(review => review.gameId === gameId)
}

export type NewReview = Review
export async function create(review: NewReview): Promise<Review> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    ...review,
    id: Math.max(...mockReviews.map(review => review.id)) + 1,
  }
}

export async function update(review: Review): Promise<Review> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockReviews.findIndex(mReview => mReview.id === review.id)
  if (index === -1) {
    console.log('Review not found', review)
    console.log('mockReviews', mockReviews)

    throw new Error('Review not found')
  }
  mockReviews[index] = review
  return review  
}

export async function get(reviewId: number): Promise<Review> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockReviews.find(mReview => mReview.id === reviewId)!
}

export async function remove(reviewId: number): Promise<void> {
  // delay(500)
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockReviews.findIndex(mReview => mReview.id === reviewId)
  mockReviews.splice(index, 1)
}
