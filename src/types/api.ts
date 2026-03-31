export type ApiCuisine = {
  name: string
}

export type ApiRestaurant = {
  id: string
  name: string
  cuisines: ApiCuisine[]
  rating: {
    count: number
    starRating: number
  }
  address: {
    firstLine: string
    city: string
    postalCode: string
    location: {
      coordinates: [number, number]
    }
  }
}

export type RestaurantsApiResponse = {
  restaurants: ApiRestaurant[]
}