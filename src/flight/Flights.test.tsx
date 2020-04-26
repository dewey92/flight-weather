import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import * as apis from './flightApis';
import { createMockedCities, createMockedFlight } from './flightDemoData';
import Flights from './Flights';

const mockedDate = new Date();

jest.mock('./flightApis');
const mockedApis = apis as jest.Mocked<typeof apis>;
mockedApis.getLocationsByTerm.mockResolvedValue(createMockedCities());
mockedApis.searchCheapestFlight.mockResolvedValue(createMockedFlight(mockedDate));

test("no history yet when you haven't performed any flight search", () => {
  const { queryByText } = render(<Flights />);

  expect(queryByText('Search history:')).not.toBeInTheDocument();
});

test('searches a flight upon form submission', async () => {
  const {
    queryByText,
    queryAllByText,
    getByLabelText,
    getByTitle,
    getByText,
    getAllByText,
  } = render(<Flights />);

  // Fill "from"
  fireEvent.keyDown(getByLabelText('From'), { key: 'ArrowDown' });
  fireEvent.change(getByLabelText('From'), { target: { value: 'jak' } });
  await waitFor(() => getByText('Jakarta, Indonesia'));
  fireEvent.click(getByText('Jakarta, Indonesia'));

  // Fill "to"
  fireEvent.keyDown(getByLabelText('To'), { key: 'ArrowDown' });
  fireEvent.change(getByLabelText('To'), { target: { value: 'ams' } });
  await waitFor(() => getByText('Amsterdam, Netherlands'));
  fireEvent.click(getByText('Amsterdam, Netherlands'));

  // Fill "departure"
  fireEvent.click(getByLabelText('Choose departure date'));
  await waitFor(() => getByText('15'));
  fireEvent.click(getByText('15'));

  // Submit
  fireEvent.click(getByText('Search'));

  expect(getByTitle('Loading')).toBeInTheDocument();

  await waitFor(() => getAllByText('Jakarta - Amsterdam'));

  expect(queryAllByText('€733')[0]).toBeInTheDocument();
  expect(queryByText('Search history:')).toBeInTheDocument();
  expect(mockedApis.searchCheapestFlight).toHaveBeenCalledTimes(1);
});
