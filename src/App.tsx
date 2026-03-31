import './App.css';
import { useEffect, useState } from 'react';
import type { RestaurantsApiResponse } from './types/api';
import type { Restaurant } from './types/restaurant';

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // fetches and formats data
  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch('/api/discovery/uk/restaurants/enriched/bypostcode/EN27EQ');

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

        setRestaurants(firstTenRestaurants)
      } catch (error) {
        console.error('Something went wrong: ', error);
  
        setError('Something went wrong while fetching the data');
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants()
  }, [])

  return (
    <main>
      <h1>Just Eat Restaurant Finder</h1>

      {loading && <p>Loading restaurants...</p>}
      {error && <p>{error}</p>}

      {!loading &&
      !error &&
      restaurants.map((restaurant) => (
        <section key={restaurant.id}>
          <h2>{restaurant.name}</h2>
          <p>Cuisines: {restaurant.cuisines.join(', ')}</p>
          <p>Rating: {restaurant.starRating}</p>
          <p>Rating count: {restaurant.ratingCount}</p>
          <p>Address: {restaurant.address}</p>
          <p>
            Coordinates: {restaurant.coordinates.latitude},{' '}
            {restaurant.coordinates.longitude}
          </p>
        </section>
      ))}
      

    </main>
  )
}

export default App