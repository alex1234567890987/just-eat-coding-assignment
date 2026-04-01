# Just Eat Restaurant Finder

A React + TypeScript web application that queries the Just Eat API by postcode and displays restaurant information in a clean, card-based interface. Built as part of the Just Eat Takeaway.com Early Careers coding assignment.

## Getting started

### Prerequisites

- Node.js (v18 or above)
- npm

### Installation

```bash
git clone https://github.com/alex1234567890987/just-eat-coding-assignment.git
cd justeat-assignment
npm install
```

### Running the app

```bash
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

### Running tests

```bash
npx vitest
```

## Features

- Search restaurants by UK postcode with input validation
- Queries the Just Eat enriched restaurants API and displays the first 10 results
- Each restaurant card displays name, cuisines, star rating, rating count, address, and restaurant logo
- Loading and error states for a smooth user experience
- Responsive card-based layout with mobile support

## Architecture

The app is structured with a clear separation of concerns:

- `services/` — API fetching and data transformation
- `components/` — React UI components (RestaurantCard, RestaurantList)
- `types/` — TypeScript types, separated into API response shape and UI shape
- `utils/` — Pure utility functions like postcode validation

The API response type and the UI type are kept separate so that components are not coupled to the external API structure. The transformation from raw API data to UI-friendly data happens once in the service layer before being passed to components.

## Tests

Tests are co-located with their source files to keep related logic and behaviour together. The service layer tests use mock data to verify the transformation logic without making real API calls. The test suite covers:

- **RestaurantCard** — verifies all four required data points (name, cuisines, rating, address) are rendered correctly
- **RestaurantList** — verifies multiple cards are rendered and an empty state is shown when no results are returned
- **Service layer** — verifies the API-to-UI data transformation, the 10-restaurant limit, and error handling for failed requests using mock API responses
- **Postcode validation** — verifies acceptance of valid UK postcodes in various formats and rejection of invalid input

## Design decisions

- The UI uses colours from Just Eat's [brand palette](https://brand-box.marketing.just-eat.com/): JET Orange (`#FF8000`) as the primary accent, Mozzarella (`#F5F0EB`) for the page background, and Charcoal (`#242E30`) for text.
- Nunito Sans was chosen as the closest freely available match to JET Sans Digital, Just Eat's custom typeface.
- Layout and spacing were influenced by Just Eat's [PIE design system](https://pie.design/) (Principles for Interfaces & Experiences), focusing on clarity, hierarchy, and simplicity.

## Assumptions

- The Just Eat API does not support CORS for browser requests, so a Vite dev server proxy is used to forward API calls during local development. This means the app is intended to be run via `npm run dev` rather than as a standalone static build.
- The brief specified four data points to display (name, cuisines, rating, address). An assumption was made to focus on these, though additional fields like delivery time, delivery cost, and distance could have been used to add depth to the interface.
- The API returns promotion-related tags (e.g. "Deals", "Collect stamps", "Freebies") within the cuisines array. It was not specified to filter these out, so they have been left in for completeness.
- Postcode validation uses a regex that validates the format of standard UK postcodes. It does not verify whether a postcode actually exists — for example, `ZZ9 9ZZ` would pass validation despite not being a real postcode.
- The default ordering returned by the API was used, as no specific sort criteria were specified in the brief.

## Improvements

- Add a backend proxy or serverless function so the app can be deployed to production without relying on the Vite dev server
- Make use of additional API fields such as delivery time, delivery cost, and distance to enrich the restaurant cards
- Make cards clickable to expand and view extra information and fields
- Add filtering by cuisine type, rating threshold, or other criteria to help users narrow down results
- Add sorting options (by rating, name, or number of reviews)
- Display promotion-related tags separately from cuisine tags, perhaps using a different colour from JET's design system such as Turmeric (`#F6C243`) to distinguish them
- Introduce more of Just Eat's secondary brand colours such as Cupcake, Aubergine, and Berry to add visual variety and better align with the full brand palette
- More closely align specific components (buttons, inputs, cards) with the component guidelines in [PIE](https://pie.design/)
- Add an interactive map view using the restaurant coordinate data already stored in state, achievable without a paid API using OpenStreetMap and Leaflet
- Use a dedicated postcode validation API or library for production-level accuracy, verifying that postcodes exist rather than just matching a format
- Add styled error messages for invalid input rather than plain text
- Improve responsive design with more comprehensive mobile breakpoints
- Add end-to-end tests with a tool like Playwright
- Add loading skeleton animations instead of a plain text loading state
- Allow users to paginate through more than 10 results

## Built with

- React 19
- TypeScript
- Vite
- Vitest + React Testing Library
- Lucide React (icons)