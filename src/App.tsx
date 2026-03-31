import './App.css';
import { useEffect, useState } from 'react';
import type { Restaurant } from './types/restaurant';
import { fetchRestaurantsByPostcode } from './services/restaurants';
import RestaurantList from './components/RestaurantList';

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
    <main className="app">
      <header className="app-header">
        <h1>Just Eat Restaurant Finder</h1>
        <p className="app-subtitle">
          Showing the first 10 restaurants for EN27EQ
        </p>
      </header>

      {loading && <p>Loading restaurants...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && <RestaurantList restaurants={restaurants} />}
    </main>
  )
}

export default App