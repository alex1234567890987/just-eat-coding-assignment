import './App.css';
import { useEffect, useState } from 'react';
import type { Restaurant } from './types/restaurant';
import { fetchRestaurantsByPostcode } from './services/restaurants';
import RestaurantList from './components/RestaurantList';

import JETLogo from './assets/JET-Logo.svg';

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [postcodeInput, setPostcodeInput] = useState('EN27EQ');
  const [postcode, setPostcode] = useState('EN27EQ');

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleaned = postcodeInput.replace(/\s+/g, '').toUpperCase();
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/;

    if (!postcodeRegex.test(cleaned)) {
      setError('Please enter a valid UK postcode');
      return;
    }

    setError('');
    setPostcode(cleaned);
  }

  useEffect(() => {
    setLoading(true);
    setError('');

    async function fetchRestaurants() {
      try {
        const firstTenRestaurants = await fetchRestaurantsByPostcode(postcode);

        setRestaurants(firstTenRestaurants);
      } catch (error) {
        console.error('Something went wrong: ', error);
  
        setError('Something went wrong while fetching the data');
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants()
  }, [postcode])

  return (
    <main className="app">
      <header className="app-header">
        <img
          src={JETLogo}
          alt="Just Eat"
          className="app-header__logo"
        />
        <h1 className="app-title">
          Find restaurants <span className="app-title--accent">near you</span>
        </h1>
      </header>

      <form className="postcode-form" onSubmit={handleSubmit}>
        <label className="postcode-form__label" htmlFor="postcode">
          Search by postcode
        </label>

        <div className="postcode-form__controls">
          <input
            id="postcode"
            className="postcode-form__input"
            type="text"
            value={postcodeInput}
            onChange={(event) => setPostcodeInput(event.target.value)}
            placeholder="Enter a UK postcode"
          />

          <button className="postcode-form__button" type="submit">
            Search
          </button>
        </div>
      </form>

      {loading && <p>Loading restaurants...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && <RestaurantList restaurants={restaurants} />}
    </main>
  )
}

export default App