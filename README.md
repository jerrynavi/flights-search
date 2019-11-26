# Flight Web App

## !!! Important

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
See the section at the end for instructions on running and building the app.

## Project Overview

There are a few things to note before you get started:

- This is a React Typescript project
- I am using [Ant Design](https://ant.design) components for the app
- The app's theme can be modified by changing the variables listed on [theming.md](./THEMING.md)
- I've set up the project directory this way
  
  ```bash
    ├── README.md
    ├── THEMING.md
    ├── config-overrides.js
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └──assets
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── store
    │   └── utils
    └── tsconfig.json
  ```

---

All components (custom buttons, cards, etc) are under the `src/components` directory, while pages accessible via a route are under the `src/pages` directory.
I'm using Redux with the [Redux Starter Kit](https://redux-starter-kit.js.org/) and the store is set up under `src/store`
Reusable functions and other utilities are under the `src/utils` directory.

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
