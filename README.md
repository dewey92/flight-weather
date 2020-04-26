# ✈️ Flight Weather

A simple app to search for the cheapest flight price with 5 day weather forecast

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Folder Structure

I decided to structure the application based on domains. Please note that currently this app has only one domain: `flight`.

`shared` is a directory dedicated to anything not related to any domains.

Learn more:
- [Domain-Driven File Structuring -React/Redux](https://medium.com/@hassan.djirdeh/domain-driven-react-redux-a474ecf7d126)
- [Domain directory structure for React apps: why it’s worth trying](https://tech.offgrid-electric.com/domain-directory-structure-for-react-apps-why-its-worth-trying-b3855ee77a1e)

## APIS

- For the flight and location API search, I'm using [Kiwi](https://docs.kiwi.com/)
- For the weather itself, I'm using [Open Weather Map provided by Rapidapi](https://rapidapi.com/community/api/open-weather-map)