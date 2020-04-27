import * as React from 'react';
import { useDebounce } from 'react-use';
import { Box, TextField, InputAdornment } from '@material-ui/core';
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
  multiple?: boolean;
  limitTags?: number;
  onChange: (loc: City | City[] | null) => void;
}

/**
 * A component to search for a city name with autocomplete capability
 */
const LocationInput: React.FC<LocationInputProps> = ({
  onChange,
  multiple = false,
  limitTags = 1,
  ...textFieldProps
}) => {
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
      includeInputInList={!multiple}
      multiple={multiple as any} // type definition of Autocomplete is not correct
      filterSelectedOptions={multiple}
      limitTags={limitTags}
      options={locations}
      onChange={(_, value) => onChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Box display="flex">
                <InputAdornment position="start" style={{ height: 'auto' }}>
                  <LocationIcon color="primary" />
                </InputAdornment>
                <div>{params.InputProps.startAdornment}</div>
              </Box>
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
