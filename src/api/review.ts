import { API_URL } from "@/config"
import axios from "axios"

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

export async function list(): Promise<Review[]> {
  console.log('review list');
  const response = await axios.get(`${API_URL}/review`)
  return response.data
}

export type NewReview = Review
export async function create(review: NewReview): Promise<Review> {
  console.log('review create', review);
  const response = await axios.post(`${API_URL}/review`, review)
  return response.data
}

export async function update(review: Review): Promise<Review> {
  console.log('review update', review);
  const response = await axios.put(`${API_URL}/review`, review)
  return response.data
}

export async function get(reviewId: number): Promise<Review> {
  console.log('review get', reviewId);
  const response = await axios.get(`${API_URL}/review/${reviewId}`)
  return response.data
}

export async function remove(reviewId: number): Promise<void> {
  console.log('review remove', reviewId);
  await axios.delete(`${API_URL}/review/${reviewId}`)
}
