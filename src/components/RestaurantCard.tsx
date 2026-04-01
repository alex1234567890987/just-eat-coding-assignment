import type { Restaurant } from '../types/restaurant'
import { MapPin, UtensilsCrossed } from 'lucide-react';

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
        <UtensilsCrossed size={14} className="restaurant-card__meta-icon" />
        {restaurant.cuisines.map((cuisine) => (
            <span key={cuisine} className="restaurant-card__pill">
                {cuisine}
            </span>
        ))}
    </div>

    <div className="restaurant-card__address-row">
        <MapPin size={14} className="restaurant-card__meta-icon" />
        <p className="restaurant-card__address">{restaurant.address}</p>
    </div>

  </div>
</article>
  )
}

export default RestaurantCard