import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import * as apis from '../flightApis';
import { createMockedCities, jakarta } from '../flightDemoData';
import LocationInput from './LocationInput';

jest.mock('../flightApis');
const mockedApis = apis as jest.Mocked<typeof apis>;
mockedApis.getLocationsByTerm.mockResolvedValue(createMockedCities());

test('searches city with autocomplete', async () => {
  const fn = jest.fn();
  const { getByLabelText, getByText } = render(
    <LocationInput label="From" name="from" id="from" onChange={fn} />
  );

  fireEvent.keyDown(getByLabelText('From'), { key: 'ArrowDown' });
  fireEvent.change(getByLabelText('From'), { target: { value: 'jak' } });
  await waitFor(() => getByText('Jakarta, Indonesia'));
  fireEvent.click(getByText('Jakarta, Indonesia'));

  expect(getByLabelText('From')).toHaveValue('Jakarta, Indonesia');
  expect(fn).toHaveBeenCalledWith(jakarta);
});
