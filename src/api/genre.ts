import { API_URL } from "@/config"
import axios from "axios"

export type Genre = {
  id: number
  name: string
}

export async function list(): Promise<Genre[]> {
  console.log('genre list');
  const response = await axios.get(`${API_URL}/genre`)
  return response.data
}