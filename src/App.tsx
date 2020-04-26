import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { Flights } from './flight';

const useStyles = makeStyles((theme) =>
  createStyles({
    app: {
      maxWidth: 1024,
      margin: `${theme.spacing(6)}px auto`,
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Flights />
    </div>
  );
}

export default App;
