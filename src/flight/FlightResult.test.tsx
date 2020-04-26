import React from 'react';
import { render } from '@testing-library/react';
import FlightResult from './FlightResult';
import { createMockedFlights } from './flightDemoData';

test('informs user that flight is not available', () => {
  const { queryByText } = render(<FlightResult result={null} />);

  expect(queryByText('No flights available')).toBeInTheDocument();
});

test('displays flight information', () => {
  const [flight] = createMockedFlights(new Date());
  const { queryByText } = render(<FlightResult result={flight} />);

  expect(queryByText('Jakarta - Amsterdam')).toBeInTheDocument();
  expect(queryByText('€733')).toBeInTheDocument();
  expect(queryByText('Broken clouds')).toBeInTheDocument();
});
