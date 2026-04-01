import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestaurantList from './RestaurantList';
import type { Restaurant } from '../types/restaurant';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Restaurant One',
    cuisines: ['Italian'],
    starRating: 4.5,
    ratingCount: 100,
    address: '1 Test Street, London, E1 1AA',
    logoUrl: '',
    coordinates: { latitude: 51.5, longitude: -0.1 },
  },
  {
    id: '2',
    name: 'Restaurant Two',
    cuisines: ['Chinese'],
    starRating: 3.0,
    ratingCount: 50,
    address: '2 Test Street, London, E1 2BB',
    logoUrl: '',
    coordinates: { latitude: 51.5, longitude: -0.1 },
  },
];

describe('RestaurantList', () => {
  it('renders the correct number of restaurant cards', () => {
    render(<RestaurantList restaurants={mockRestaurants} />);
    expect(screen.getByText('Restaurant One')).toBeInTheDocument();
    expect(screen.getByText('Restaurant Two')).toBeInTheDocument();
  });

  it('shows empty message when no restaurants are provided', () => {
    render(<RestaurantList restaurants={[]} />);
    expect(screen.getByText(/no restaurants found/i)).toBeInTheDocument();
  });
});