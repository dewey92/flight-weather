import { addDays } from 'date-fns';
import { AvailableFlight, City } from './flightTypes';

export const jakarta: City = {
  id: 'jakarta_id',
  name: 'Jakarta',
  code: 'JKT',
  country: {
    id: 'ID',
    name: 'Indonesia',
    code: 'ID',
  },
  location: {
    lat: -6.174465,
    lon: 106.822745,
  },
};

export const amsterdam: City = {
  id: 'amsterdam_nl',
  name: 'Amsterdam',
  code: 'AMS',
  country: {
    id: 'NL',
    name: 'Netherlands',
    code: 'NL',
  },
  location: {
    lat: 52.370216,
    lon: 4.895168,
  },
};

export const budapest: City = {
  id: 'budapest_hu',
  name: 'Budapest',
  code: 'BUD',
  country: {
    id: 'HU',
    name: 'Hungary',
    code: 'HU',
  },
  location: {
    lat: 47.497912,
    lon: 19.040235,
  },
};

export const createMockedFlights = (today: Date): AvailableFlight[] => [
  {
    fromCity: jakarta,
    toCity: amsterdam,
    departure: today,
    price: 733,
    weather: [
      { date: today, minTemp: 7, maxTemp: 14, description: 'Sky is clear', icon: '' },
      { date: addDays(today, 1), minTemp: 8, maxTemp: 20, description: 'Broken clouds', icon: '' },
      { date: addDays(today, 2), minTemp: 9, maxTemp: 22, description: 'Moderate rain', icon: '' },
      { date: addDays(today, 3), minTemp: 6, maxTemp: 19, description: 'Light rain', icon: '' },
      { date: addDays(today, 4), minTemp: 9, maxTemp: 21, description: 'Sky is clear', icon: '' },
    ],
  },
  {
    fromCity: jakarta,
    toCity: budapest,
    departure: today,
    price: 712,
    weather: [
      { date: today, minTemp: 7, maxTemp: 14, description: 'Sky is clear', icon: '' },
      { date: addDays(today, 1), minTemp: 8, maxTemp: 20, description: 'Broken clouds', icon: '' },
      { date: addDays(today, 2), minTemp: 9, maxTemp: 22, description: 'Moderate rain', icon: '' },
      { date: addDays(today, 3), minTemp: 6, maxTemp: 19, description: 'Light rain', icon: '' },
      { date: addDays(today, 4), minTemp: 9, maxTemp: 21, description: 'Sky is clear', icon: '' },
    ],
  },
];

export const createMockedCities = () => [jakarta, amsterdam, budapest];
