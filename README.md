# credit-reports-service

## Tech Stack

- Language: [TypeScript](https://www.typescriptlang.org/)
- Testing: [Jest](https://jestjs.io/)

## Prerequisites

- Install Node.js with [nvm](https://github.com/creationix/nvm).
- Use [node 12](https://nodejs.org/en/about/releases/) (current node LTS version).

## 🚀 Quick start

- Run `npm install` to install all packages used in the project.
- Run `npm start` to start the api.
- Run `npm test` to run the unit test

## Current state and improvements in the application

- The system will be reading the input from a file, `input.txt`, which is in the root of the project.
- Inspiration for overall design has been **template pattern**.
- For simplicity , i am reading the whole file at once. 
  If the file/input is large, then we should read a few lines at a time and process it in a loop. 