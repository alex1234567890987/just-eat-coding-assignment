import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('...Loading');

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch('/api/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF');

        if (!response.ok) {
          throw new Error('Failed to fetch')
        }

        const data = await response.json();

        console.log(data);
        setMessage('Data fetched, check console');
      } catch (error) {
        console.error('Something went wrong: ', error);
        setMessage('Something went wrong while fetching the data');
      }
    }

    fetchRestaurants()
  }, [])

  return (
    <main>
      <h1>Just Eat Restaurant Finder</h1>
      <p>{message}</p>
    </main>
  )
}

export default App