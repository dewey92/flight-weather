import React from 'react';
import {
  makeStyles,
  createStyles,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
} from '@material-ui/core';
import SadIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { format } from 'date-fns';
import { AvailableFlight } from './flightTypes';

const useStyles = makeStyles((theme) =>
  createStyles({
    result: {
      marginTop: theme.spacing(4),
      display: 'flex',
      justifyContent: 'center',
    },
    noResult: {
      verticalAlign: 'middle',
      display: 'inline-flex',
    },
    weatherDescription: {
      textTransform: 'capitalize',
    },
    weatherTemp: {
      textAlign: 'right',
    },
  })
);

interface FlightResultProps {
  result: AvailableFlight | null;
}

const FlightResult: React.FC<FlightResultProps> = ({ result }) => {
  const classes = useStyles();

  if (result === null) {
    return (
      <Typography variant="h6" className={classes.noResult}>
        <SadIcon /> No flights available
      </Typography>
    );
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">
            {result.fromCity.name} - {result.toCity.name}
          </Typography>
          <Typography variant="h6" color="secondary">
            €{result.price}
          </Typography>
        </Box>
        <Typography color="textSecondary" gutterBottom>
          {format(result.departure, 'EEEE, d MMMM yyyy')}
        </Typography>
        <Typography variant="button" display="block" gutterBottom></Typography>
        <Typography variant="body2">
          Weather forecast for the next 5 days in {result.toCity.name}:
        </Typography>
        <List dense>
          {result.weather.map((forecast, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar src={forecast.icon} alt={forecast.description} />
              </ListItemAvatar>
              <ListItemText>
                <Box display="flex" justifyContent="space-between">
                  <div>
                    <Typography
                      variant={'body2'}
                      component="span"
                      display="block"
                      className={classes.weatherDescription}
                    >
                      {forecast.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" display="block">
                      {format(forecast.date, 'iii, d MMM')}
                    </Typography>
                  </div>
                  <div className={classes.weatherTemp}>
                    <Typography variant={'body2'} component="span" display="block">
                      {Math.round(forecast.maxTemp)} °C
                    </Typography>
                    <Typography variant="body2" color="textSecondary" display="block">
                      {Math.round(forecast.minTemp)} °C
                    </Typography>
                  </div>
                </Box>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default FlightResult;
