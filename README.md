## Gomoku

### Demo
https://codesandbox.io/s/github/nowshad-sust/gomoku

### Features
- A NxN grid based board board game.
- Two players play in the same browser window in turns.
- Players can input their names.
- 5 in a row (horizontal/vertical/perpendicular) wins the game.
- The board will exapnd when the almost all the grides are marked.
- Game can be played in multile rounds.
- Scorecard will show updated scores.
- Players will start each round alternatively.

## Technical details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Tooling
- Typescript
- React
- Redux
- ESLint
- SASS/SCSS
- Husky

## How to run
- Prerequites: `NodeJS` && working `npm`.
- Clone The repository https://github.com/nowshad-sust/gomoku.git
- Go to the project root directory`cd gomoku`.
- Run `npm install` to download dependencies.
- Running `npm start` should open the app in on port `3000` by default.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`
Runs a eslint check through the src folder and fixes all auto-fixable problems.

## TODO
- [ ] Store
> - [ ] Re-organize redux store (follow redux-toolkit pattern).
> - [ ] Refactor actions and dispatch.
- [ ] Typescript
> - [ ] Add more return types.
> - [ ] Remove any from reducers.
> - [ ] Add action types.
- [ ] Game Algorithm
> - [ ] Take only 9 blocks for pattern check.
> - [ ] Optimize diagonal check.
> - [ ] Keep pre-calculated state for game check.
- [ ] Add Test covergae using Jest & Enzyme.
