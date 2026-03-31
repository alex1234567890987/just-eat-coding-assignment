import type { RestaurantsApiResponse } from "../types/api";
import type { Restaurant } from "../types/restaurant";

export async function fetchRestaurantsByPostcode(postcode: string): Promise<Restaurant[]> {
    const response = await fetch(`/api/discovery/uk/restaurants/enriched/bypostcode/${postcode}`);

    if (!response.ok) {
        throw new Error('Failed to fetch');
    }

    const data: RestaurantsApiResponse = await response.json();

    const firstTenRestaurants: Restaurant[] = data.restaurants.slice(0,10).map((restaurant) => {
        const [long, lat] = restaurant.address.location.coordinates;

        return {
            id: restaurant.id,
            name: restaurant.name,
            cuisines: restaurant.cuisines.map((cuisine) => cuisine.name),
            starRating: restaurant.rating.starRating,
            ratingCount: restaurant.rating.count,
            address: `${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}`,
            coordinates: {
                longitude: long,
                latitude: lat
            }
        }
    })

    return firstTenRestaurants;
}