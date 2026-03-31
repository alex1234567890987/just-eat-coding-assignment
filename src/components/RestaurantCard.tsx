import type { Restaurant } from '../types/restaurant'

type RestaurantCardProps = {
  restaurant: Restaurant
}

function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
<article className="restaurant-card">
  <div className="restaurant-card__logo">
    {restaurant.logoUrl ? (
      <img
        className="restaurant-card__image"
        src={restaurant.logoUrl}
        alt={`${restaurant.name} logo`}
      />
    ) : (
      <div className="restaurant-card__placeholder" />
    )}
  </div>

  <div className="restaurant-card__content">
    <div className="restaurant-card__top-row">
      <h2 className="restaurant-card__title">{restaurant.name}</h2>

      <div className="restaurant-card__rating">
        <span className="restaurant-card__rating-star">★</span>
        <span className="restaurant-card__rating-value">
          {restaurant.starRating.toFixed(1)}
        </span>
        <span className="restaurant-card__rating-count">
          ({restaurant.ratingCount.toLocaleString()})
        </span>
      </div>
    </div>

    <div className="restaurant-card__cuisines">
      {restaurant.cuisines.map((cuisine) => (
        <span key={cuisine} className="restaurant-card__pill">
          {cuisine}
        </span>
      ))}
    </div>

    <p className="restaurant-card__address">{restaurant.address}</p>
  </div>
</article>
  )
}

export default RestaurantCard