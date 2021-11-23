# Rick & Morty Challengue

Hi! 

This repo contains a react application that uses a data from Rick Morty API, to return a JSON with the results required for a challenge.

Thanks for reviewing, I keep remaining if you want to give me feedback!

Inside the repo, the principal folder is **src**, and it contains:

- scr:

  - pages:
    - Challengue.js: This file has the principal render component,  with the required results.

  - utils:
  
    - charCount.js: Contain a function which counts how many times appear a letter in all the names for each item.
    
    - getEpisodesLocations.js: Contain a function that returns an array with all the character's origin locations for each episode.

  - services:
  
    - apiFetch.js: Contain a function that fetch data from the API.


API: https://rickandmortyapi.com/

Before running any other script you should install your dependencies running:

### `yarn install`

After that, you can see the results only running:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

## Testing

This app has tests for each file, if you want to see them, only run:
### `yarn test`











