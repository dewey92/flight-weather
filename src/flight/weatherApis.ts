import axios from 'axios';
import { City, Weather } from './flightTypes';
import { addDays } from 'date-fns';

/**
 * Get weather forecast for the next 5 days
 */
export async function getWeatherForecast(city: City) {
  interface WeatherResponse {
    list: Array<{
      temp: {
        min: number;
        max: number;
      };
      weather: Array<{
        description: string;
        icon: string;
      }>;
    }>;
  }

  function resToWeather(res: WeatherResponse): Weather[] {
    const today = new Date();
    return res.list.map((data, i) => ({
      date: addDays(today, i),
      minTemp: data.temp.min,
      maxTemp: data.temp.max,
      description: data.weather[0]?.description,
      icon: data.weather[0]
        ? `http://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`
        : undefined,
    }));
  }

  try {
    const url = `https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${city.name},${city.country.id}&lat=${city.location.lat}&lon=${city.location.lon}&cnt=5&units=metric`;
    const { data } = await axios.get<WeatherResponse>(url, {
      headers: {
        'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
      },
    });

    return resToWeather(data);
  } catch (e) {
    return [];
  }
}
