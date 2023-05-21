import { API_URL } from "@/config"
import axios from "axios"

export type Platform = {
  id: number
  name: string
}

export async function list(): Promise<Platform[]> {
  console.log('platform list');
  const response = await axios.get(`${API_URL}/platform`)
  return response.data
}