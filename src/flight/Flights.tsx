import React from 'react';
import { makeStyles, createStyles, CircularProgress, Grid, Typography } from '@material-ui/core';
import { useRemoteData } from '../shared';
import SearchFlightForm from './form/SearchFlightForm';
import FlightResult from './FlightResult';
import { AvailableFlight, City } from './flightTypes';
import { searchCheapestFlight } from './flightApis';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(4),
    },
    result: {
      display: 'flex',
      margin: 'auto',
      marginTop: theme.spacing(4),
    },
    loading: {
      margin: 'auto',
    },
    resultItem: {
      maxWidth: 600,
    },
  })
);

function Flights() {
  const { status, loading, success } = useRemoteData<Array<AvailableFlight | null>>();
  const classes = useStyles();

  const handleSubmit = async (payload: { fromCity: City; toCities: City[]; departure: Date }) => {
    loading();
    const result = await searchCheapestFlight(payload);
    success(result);
  };

  return (
    <div>
      <Typography variant="h4" align="center" className={classes.title}>
        Compare Flight Fares by Cities
      </Typography>

      <SearchFlightForm status={status} onSubmit={handleSubmit} />

      <main className={classes.result}>
        {status.type === 'Loading' && (
          <CircularProgress className={classes.loading} title="Loading" disableShrink />
        )}
        {status.type === 'Success' && (
          <Grid container spacing={2} justify="center">
            {status.value.map((flight, i) => (
              <Grid item xs={12} sm key={i} className={classes.resultItem}>
                <FlightResult result={flight} />
              </Grid>
            ))}
          </Grid>
        )}
      </main>
    </div>
  );
}

export default Flights;
