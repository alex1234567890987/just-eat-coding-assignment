import type { Restaurant } from '../types/restaurant'
import RestaurantCard from './RestaurantCard'

type RestaurantListProps = {
  restaurants: Restaurant[]
}

function RestaurantList({ restaurants }: RestaurantListProps) {
  return (
    <section className="restaurant-list">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </section>
  )
}

export default RestaurantList