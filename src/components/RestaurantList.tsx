import type { Restaurant } from '../types/restaurant'
import RestaurantCard from './RestaurantCard'

type RestaurantListProps = {
  restaurants: Restaurant[]
}

function RestaurantList({ restaurants }: RestaurantListProps) {
  if (restaurants.length === 0) {
    return (
      <div className="restaurant-list__empty">
        <p>No restaurants found for this postcode. Try another one!</p>
      </div>
    );
  }

  return (
    <section className="restaurant-list">
        <p className="restaurant-list__count">
          Showing {restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'} nearby
        </p>
        {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
    </section>
  )
}

export default RestaurantList