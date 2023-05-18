export type PaginatedList<T> = {
  data: T[]
  total: number
  next: string | null
  previous: string | null
}