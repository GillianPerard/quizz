# Quizz

## Prerequisites

- NodeJS 20.x [https://nodejs.org/en](https://nodejs.org/en)
- Angular CLI 17.1.x [https://angular.io/cli](https://angular.io/cli)

## Installation

Install dependencies:

```sh
npm i
```

## Environments

Environments files are not versioned for security reasons so you need to create one `src/environments/environment.ts` and replace the placeholders by the correct values.

```ts
export const environment = {
  apiUrl: '<your-api-url>',
};
```

## Run

```sh
npm start
```

## Lint

```sh
# run lint
npm run lint

# run lint and try to fix errors
npm run lint:fix
```

## Tests

```sh
npm run test
```
