export interface LocationCoord {
  lat: number;
  lon: number;
}

export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface City {
  id: string;
  code: string;
  name: string;
  country: Country;
  location: LocationCoord;
}

export interface Weather {
  date: Date;
  minTemp: number;
  maxTemp: number;
  description?: string;
  icon?: string;
}

export interface AvailableFlight {
  fromCity: City;
  toCity: City;
  departure: Date;
  price: number;
  weather: Weather[];
}
