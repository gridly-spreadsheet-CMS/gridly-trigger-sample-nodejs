# Gridly Sample NodeJS

A boilerplate Node.js app using [Koa](https://koajs.com/).

This application show samples how to implement hooks to handle changes from [Gridly App](http://app.gridly.com/).

## Dependencies

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)

## Configuration

Environment variables defined in `.env` file for:

* Gridly API key
* Google API key path

## Deployment instructions

`npm install`

`npm run start` to start in local

`npm run build` to package source

`cd build/`

`npm run start:prod` to start in production

Check out the API docs at http://localhost:5000/docs

### How to run tests

`npm run test`

### How to run debugger

`node --inspect src/index.js`
