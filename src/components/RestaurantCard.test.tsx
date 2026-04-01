import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestaurantCard from './RestaurantCard';
import type { Restaurant } from '../types/restaurant';

const mockRestaurant: Restaurant = {
  id: '123',
  name: 'Test Restaurant',
  cuisines: ['Italian', 'Pizza'],
  starRating: 4.5,
  ratingCount: 150,
  address: '123 Test Street, London, E1 1AA',
  logoUrl: 'https://example.com/logo.gif',
  coordinates: {
    latitude: 51.5,
    longitude: -0.1,
  },
};

describe('RestaurantCard', () => {
  it('renders the restaurant name', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
  });

  it('renders the star rating', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders the rating count', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText('(150)')).toBeInTheDocument();
  });

  it('renders the cuisines as pills', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
  });

  it('renders the address', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText('123 Test Street, London, E1 1AA')).toBeInTheDocument();
  });

  it('renders the logo image when logoUrl is provided', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    const img = screen.getByAltText('Test Restaurant logo');
    expect(img).toBeInTheDocument();
  });
});