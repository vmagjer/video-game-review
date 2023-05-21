import { API_URL } from "@/config"
import axios from 'axios'
import type { Genre } from "./genre"
import type { Review } from "./review"
import type { Platform } from "./platform"

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


export async function list(): Promise<Game[]> {
  const response = await axios.get(`${API_URL}/games`)
  return response.data
}

export async function listByGenre(genreId: number): Promise<Game[]> {
  const response = await axios.get(`${API_URL}/genre/${genreId}`)
  return response.data
}

export async function listByPlatform(platformId: number): Promise<Game[]> {
  const response = await axios.get(`${API_URL}/platform/${platformId}`)
  return response.data
}

export async function find(gameId: number): Promise<GameDetails> {
  const response = await axios.get(`${API_URL}/games/${gameId}`)
  return response.data
}

export type NewGame = Omit<Game, 'id' | 'publishedDate'>
export async function create(game: NewGame): Promise<Game> {
  const response = await axios.post(`${API_URL}/games`, game)
  return response.data
}

export async function update(game: Game): Promise<Game> {
  const response = await axios.put(`${API_URL}/games`, game)
  return response.data
}

export async function remove(gameId: number): Promise<void> {
  await axios.delete(`${API_URL}/games/${gameId}`)
}

