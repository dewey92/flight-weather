import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import * as apis from './flightApis';
import { createMockedCities, createMockedFlights } from './flightDemoData';
import Flights from './Flights';

const mockedDate = new Date();

jest.mock('./flightApis');
const mockedApis = apis as jest.Mocked<typeof apis>;
mockedApis.getLocationsByTerm.mockResolvedValue(createMockedCities());
mockedApis.searchCheapestFlight.mockResolvedValue(createMockedFlights(mockedDate));

test('searches a flight upon form submission', async () => {
  const { queryByText, getByLabelText, getByTitle, getByText, getByPlaceholderText } = render(
    <Flights />
  );

  // Fill "from"
  fireEvent.keyDown(getByLabelText('From'), { key: 'ArrowDown' });
  fireEvent.change(getByLabelText('From'), { target: { value: 'jak' } });
  await waitFor(() => getByText('Jakarta, Indonesia'));
  fireEvent.click(getByText('Jakarta, Indonesia'));

  // Fill "to" Amsterdam
  fireEvent.keyDown(getByPlaceholderText('Where to?'), { key: 'ArrowDown' });
  fireEvent.change(getByPlaceholderText('Where to?'), { target: { value: 'ams' } });
  await waitFor(() => getByText('Amsterdam, Netherlands'));
  fireEvent.click(getByText('Amsterdam, Netherlands'));

  // Add Budapest to "to"
  fireEvent.keyDown(getByPlaceholderText('Where to?'), { key: 'ArrowDown' });
  fireEvent.change(getByPlaceholderText('Where to?'), { target: { value: 'bud' } });
  await waitFor(() => getByText('Budapest, Hungary'));
  fireEvent.click(getByText('Budapest, Hungary'));

  // Fill "departure"
  fireEvent.click(getByLabelText('Choose departure date'));
  await waitFor(() => getByText('15'));
  fireEvent.click(getByText('15'));

  // Submit
  fireEvent.click(getByText('Search & Compare'));

  expect(getByTitle('Loading')).toBeInTheDocument();

  await waitFor(() => {
    expect(queryByText('Jakarta - Amsterdam')).toBeInTheDocument();
    expect(queryByText('Jakarta - Budapest')).toBeInTheDocument();
  });

  expect(queryByText('€733')).toBeInTheDocument();
  expect(queryByText('€712')).toBeInTheDocument();
  expect(mockedApis.searchCheapestFlight).toHaveBeenCalledTimes(1);
});
