# ✈️ Flight Weather

A simple app to search for the cheapest flight price with 5 day weather forecast

DEMO: https://flight-weather.netlify.app/
[![Netlify Status](https://api.netlify.com/api/v1/badges/0bfae7fd-e5cc-4987-aed4-cef87511f272/deploy-status)](https://app.netlify.com/sites/flight-weather/deploys)

## Available Scripts

In the project directory, you can run:

- `yarn dev`: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `yarn test`: Launches the test runner in the interactive watch mode
- `yarn build`: Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Folder Structure

I decided to structure the application based on domains. Please note that currently this little app has only one domain: `flight`.

`shared` is a directory dedicated to anything not related to any domains.

Learn more:
- [Domain-Driven File Structuring -React/Redux](https://medium.com/@hassan.djirdeh/domain-driven-react-redux-a474ecf7d126)
- [Domain directory structure for React apps: why it’s worth trying](https://tech.offgrid-electric.com/domain-directory-structure-for-react-apps-why-its-worth-trying-b3855ee77a1e)

## APIs

- For the flight and location API search, I'm using [Kiwi](https://docs.kiwi.com/)
- For the weather itself, I'm using [Open Weather Map provided by Rapidapi](https://rapidapi.com/community/api/open-weather-map)

## FAQ on Tools Decisions
- **Why CRA (Create React App)?** CRA provides the best developer experience when setting up a new React project. It lets you forget all the mundane tasks of setting up, configuring bundler, and installing other necessary tools to get your app running
- **Why React Testing Library?** I have had a not so pleasant experience with other testing libraries (i.e Enzyme), and I find RTL to be easier and more straightforward as it forces developers to test components from the perspective of an end user.
- **Why Typescript?** I believe that using a static analysis tool like Typescript can boost developer's productivity. It at least prevents developers from making stupid mistakes like using/passing the wrong data types, forgetting the possibility of a data type containing `undefined` or `null`, and many other stuff. It can become some sort of in-code documentation as well.