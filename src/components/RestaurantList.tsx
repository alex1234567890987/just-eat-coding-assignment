import type { Restaurant } from '../types/restaurant'
import RestaurantCard from './RestaurantCard'

type RestaurantListProps = {
  restaurants: Restaurant[]
}

function RestaurantList({ restaurants }: RestaurantListProps) {
  return (
    <>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </>
  )
}

export default RestaurantList