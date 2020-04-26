import * as React from 'react';
import { useDebounce } from 'react-use';
import { TextField, InputAdornment } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import LocationIcon from '@material-ui/icons/LocationOn';
import { City } from '../flightTypes';
import { getLocationsByTerm } from '../flightApis';

interface LocationInputProps {
  label: string;
  id?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (loc: City | null) => void;
}

const LocationInput: React.FC<LocationInputProps> = (props) => {
  const { onChange, ...textFieldProps } = props;

  const [value, setValue] = React.useState('');
  const [locations, setLocations] = React.useState<City[]>([]);

  useDebounce(
    () => {
      async function searchLoc(term: string) {
        const locations = await getLocationsByTerm(term);
        setLocations(locations);
      }

      value && searchLoc(value);
    },
    500,
    [value]
  );

  return (
    <Autocomplete<City>
      getOptionLabel={(option) => `${option.name}, ${option.country.name}`}
      getOptionSelected={(option, value) => option.name === value.name}
      autoComplete
      includeInputInList
      options={locations}
      onChange={(_, value: City | null) => onChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <LocationIcon color="primary" />
              </InputAdornment>
            ),
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth
        />
      )}
    />
  );
};

export default LocationInput;
