import './App.css';
import { useEffect, useState } from 'react';
import type { Restaurant } from './types/restaurant';
import { fetchRestaurantsByPostcode } from './services/restaurants';

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const firstTenRestaurants = await fetchRestaurantsByPostcode('EN27EQ')

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