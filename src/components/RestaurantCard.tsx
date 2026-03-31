import type { Restaurant } from '../types/restaurant'

type RestaurantCardProps = {
  restaurant: Restaurant
}

function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <article className="restaurant-card">
      <h2 className="restaurant-card__title">{restaurant.name}</h2>
      <p className="restaurant-card__meta">
        <strong>Cuisines:</strong> {restaurant.cuisines.join(', ')}
      </p>
      <p className="restaurant-card__meta">
        <strong>Rating:</strong> {restaurant.starRating}
      </p>
      <p className="restaurant-card__meta">
        <strong>Rating count:</strong> {restaurant.ratingCount}
      </p>
      <p className="restaurant-card__meta">
        <strong>Address:</strong> {restaurant.address}
      </p>
      <p className="restaurant-card__meta">
        <strong>Coordinates:</strong> {restaurant.coordinates.latitude},{' '}
        {restaurant.coordinates.longitude}
      </p>
    </article>
  )
}

export default RestaurantCard