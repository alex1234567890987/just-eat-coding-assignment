import type { Restaurant } from '../types/restaurant'

type RestaurantCardProps = {
  restaurant: Restaurant
}

function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <section>
      <h2>{restaurant.name}</h2>
      <p>Cuisines: {restaurant.cuisines.join(', ')}</p>
      <p>Rating: {restaurant.starRating}</p>
      <p>Rating count: {restaurant.ratingCount}</p>
      <p>Address: {restaurant.address}</p>
      <p>
        Coordinates: {restaurant.coordinates.latitude}, {restaurant.coordinates.longitude}
      </p>
    </section>
  )
}

export default RestaurantCard