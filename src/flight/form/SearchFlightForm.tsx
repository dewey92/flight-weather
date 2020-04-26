import * as React from 'react';
import { Button, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/SearchRounded';
import DateFnsUtils from '@date-io/date-fns';
import { startOfToday } from 'date-fns';
import { Status } from '../../shared';
import { City, AvailableFlight } from '../flightTypes';
import LocationInput from './LocationInput';

interface SearchFlightFormProps {
  status: Status<AvailableFlight | null>;
  onSubmit: (payload: { fromCity: City; toCity: City; departure: Date }) => void;
}

export const SearchFlightForm: React.FC<SearchFlightFormProps> = ({ status, onSubmit }) => {
  const [fromCity, setFromCity] = React.useState<City | null>(null);
  const [toCity, setToCity] = React.useState<City | null>(null);
  const [departure, setDeparture] = React.useState<Date | null>(new Date());

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fromCity || !toCity || !departure) return;
    onSubmit({ fromCity, toCity, departure });
  };

  return (
    <form onSubmit={submit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <LocationInput
            label="From"
            id="from"
            name="from"
            placeholder="Where from?"
            onChange={setFromCity}
            disabled={status.type === 'Loading'}
          />
        </Grid>
        <Grid item xs>
          <LocationInput
            label="To"
            id="to"
            name="to"
            placeholder="Where to?"
            onChange={setToCity}
            disabled={status.type === 'Loading'}
          />
        </Grid>
        <Grid item xs>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="Departure"
              id="departure"
              placeholder="Departure date"
              variant="inline"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              value={departure}
              minDate={startOfToday()}
              onChange={(date) => setDeparture(date)}
              KeyboardButtonProps={{
                'aria-label': 'Choose departure date',
                color: 'primary',
              }}
              InputAdornmentProps={{ position: 'start' }}
              fullWidth
              disableToolbar
              disabled={status.type === 'Loading'}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            disabled={status.type === 'Loading'}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchFlightForm;
