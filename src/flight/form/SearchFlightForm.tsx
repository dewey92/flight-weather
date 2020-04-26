import * as React from 'react';
import { makeStyles, createStyles, Button, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/SearchRounded';
import DateFnsUtils from '@date-io/date-fns';
import { startOfToday } from 'date-fns';
import { Status } from '../../shared';
import { City, AvailableFlight } from '../flightTypes';
import LocationInput from './LocationInput';

const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      maxWidth: 600,
      margin: 'auto',
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  })
);

interface SearchFlightFormProps {
  status: Status<Array<AvailableFlight | null>>;
  onSubmit: (payload: { fromCity: City; toCities: City[]; departure: Date }) => void;
}

export const SearchFlightForm: React.FC<SearchFlightFormProps> = ({ status, onSubmit }) => {
  const [fromCity, setFromCity] = React.useState<City | null>(null);
  const [toCities, setToCities] = React.useState<City[]>([]);
  const [departure, setDeparture] = React.useState<Date | null>(new Date());
  const classes = useStyles();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fromCity || !toCities || !departure) return;
    onSubmit({ fromCity, toCities, departure });
  };

  return (
    <form onSubmit={submit} className={classes.form}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <LocationInput
            label="From"
            id="from"
            name="from"
            placeholder="Where from?"
            onChange={(city) => setFromCity(city as City | null)}
            disabled={status.type === 'Loading'}
          />
        </Grid>
        <Grid item xs={12}>
          <LocationInput
            label="To"
            id="to"
            name="to"
            placeholder="Where to?"
            multiple
            limitTags={2}
            onChange={(cities) => setToCities(cities as City[])}
            disabled={status.type === 'Loading'}
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12} className={classes.buttonWrapper}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            disabled={status.type === 'Loading'}
          >
            Search & Compare
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchFlightForm;
