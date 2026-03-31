export type Restaurant = {
  id: string
  name: string
  cuisines: string[]
  starRating: number
  ratingCount: number
  address: string
  coordinates: {
    latitude: number
    longitude: number
  }
}