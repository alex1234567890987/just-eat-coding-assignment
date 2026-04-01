import { describe, it, expect, vi } from 'vitest';
import { fetchRestaurantsByPostcode } from './restaurants';

const mockApiResponse = {
  restaurants: [
    {
      id: '1',
      name: 'Test Place',
      cuisines: [
        { name: 'Italian', uniqueName: 'italian' },
        { name: 'Deals', uniqueName: 'deals' },
      ],
      rating: { starRating: 4.5, count: 200 },
      address: {
        firstLine: '10 High Street',
        city: 'London',
        postalCode: 'E1 1AA',
        location: { type: 'Point', coordinates: [-0.1, 51.5] },
      },
      logoUrl: 'https://example.com/logo.gif',
    },
  ],
};

describe('fetchRestaurantsByPostcode', () => {
  it('transforms API data into the correct UI shape', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const result = await fetchRestaurantsByPostcode('E11AA');

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: '1',
      name: 'Test Place',
      cuisines: ['Italian', 'Deals'],
      starRating: 4.5,
      ratingCount: 200,
      address: '10 High Street, London, E1 1AA',
      coordinates: { longitude: -0.1, latitude: 51.5 },
      logoUrl: 'https://example.com/logo.gif',
    });
  });

  it('returns only the first 10 restaurants', async () => {
    const manyRestaurants = Array.from({ length: 15 }, (_, i) => ({
      ...mockApiResponse.restaurants[0],
      id: String(i),
      name: `Restaurant ${i}`,
    }));

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ restaurants: manyRestaurants }),
    });

    const result = await fetchRestaurantsByPostcode('E11AA');

    expect(result).toHaveLength(10);
  });

  it('throws an error when the response is not ok', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(fetchRestaurantsByPostcode('E11AA')).rejects.toThrow('Failed to fetch');
  });
});