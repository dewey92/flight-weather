import axios from 'axios';
import { format } from 'date-fns';
import { City, AvailableFlight, Weather } from './flightTypes';
import { getWeatherForecast } from './weatherApis';

export async function getLocationsByTerm(term: string) {
  interface LocationsResponse {
    locations: City[];
  }

  const url = `https://api.skypicker.com/locations?term=${term}&locale=en-US&location_types=city&limit=5&active_only=true&sort=name`;
  const { data } = await axios.get<LocationsResponse>(url);

  return data.locations;
}

export async function searchCheapestFlight({
  fromCity,
  toCity,
  departure,
}: {
  fromCity: City;
  toCity: City;
  departure: Date;
}) {
  interface FlightsResponse {
    data: Array<{ conversion: { EUR: number } }>;
  }

  function resToFlight(res: FlightsResponse, weatherForecast: Weather[]): AvailableFlight | null {
    if (!res.data.length) return null;
    return {
      fromCity,
      toCity,
      departure,
      price: res.data[0].conversion.EUR,
      weather: weatherForecast,
    };
  }

  try {
    const dateFrom = format(departure, 'dd/MM/yyyy');
    const url = `https://api.skypicker.com/flights?fly_from=${fromCity.id}&fly_to=${toCity.id}&date_from=${dateFrom}&date_to=${dateFrom}&curr=EUR&partner=picky&limit=1`;
    const { data } = await axios.get<FlightsResponse>(url);
    const weatherForecast = await getWeatherForecast(toCity);

    return resToFlight(data, weatherForecast);
  } catch (e) {
    return null;
  }
}
