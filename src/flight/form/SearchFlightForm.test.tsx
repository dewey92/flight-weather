import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { advanceTo, clear } from 'jest-date-mock';
import * as apis from '../flightApis';
import { createMockedCities, jakarta, amsterdam } from '../flightDemoData';
import SearchFlightForm from './SearchFlightForm';

jest.mock('../flightApis');
const mockedApis = apis as jest.Mocked<typeof apis>;
mockedApis.getLocationsByTerm.mockResolvedValue(createMockedCities());

test('form not submitted when you have empty fields', async () => {
  const mockedOnSubmit = jest.fn();
  const { getByText } = render(
    <SearchFlightForm status={{ type: 'NotAsked' }} onSubmit={mockedOnSubmit} />
  );

  fireEvent.click(getByText('Search & Compare'));

  expect(mockedOnSubmit).not.toHaveBeenCalled();
});

test('submits form when all fields are filled', async () => {
  const firstJanuary = new Date(2020, 1, 1, 0, 0, 0); // 1 Jan 2020
  advanceTo(firstJanuary);

  const mockedOnSubmit = jest.fn();
  const { getByText, getByLabelText, getByPlaceholderText } = render(
    <SearchFlightForm status={{ type: 'NotAsked' }} onSubmit={mockedOnSubmit} />
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

  // Submit
  fireEvent.click(getByText('Search & Compare'));

  expect(mockedOnSubmit).toHaveBeenCalledWith({
    fromCity: jakarta,
    toCities: [amsterdam],
    departure: firstJanuary,
  });
  clear();
});
