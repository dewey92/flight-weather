import React from 'react';
import { makeStyles, createStyles, CircularProgress, Typography } from '@material-ui/core';
import { useRemoteData } from '../shared';
import SearchFlightForm from './form/SearchFlightForm';
import FlightResult from './FlightResult';
import { AvailableFlight, City } from './flightTypes';
import { searchCheapestFlight } from './flightApis';

const useStyles = makeStyles((theme) =>
  createStyles({
    result: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      marginTop: theme.spacing(4),
      maxWidth: 600,
    },
    loading: {
      margin: 'auto',
    },
    historyWrapper: {
      marginTop: theme.spacing(4),
    },
    historyItem: {
      marginBottom: theme.spacing(2),
    },
  })
);

function Flights() {
  const { status, loading, success } = useRemoteData<AvailableFlight | null>();
  const [history, setHistory] = React.useState<AvailableFlight[]>([]);
  const classes = useStyles();

  const handleSubmit = async (payload: { fromCity: City; toCity: City; departure: Date }) => {
    loading();
    const result = await searchCheapestFlight(payload);
    success(result);

    if (result !== null) {
      setHistory((old) => [result, ...old]);
    }
  };

  return (
    <div>
      <SearchFlightForm status={status} onSubmit={handleSubmit} />

      <main className={classes.result}>
        {status.type === 'Loading' && (
          <CircularProgress className={classes.loading} title="Loading" disableShrink />
        )}
        {status.type === 'Success' && <FlightResult result={status.value} />}

        {history.length > 0 && (
          <div className={classes.historyWrapper}>
            <Typography variant="h6">Search history:</Typography>
            {history.map((item, i) => (
              <div className={classes.historyItem} key={i}>
                <FlightResult result={item} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Flights;
