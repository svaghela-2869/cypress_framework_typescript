# Cypress Framework with Typescript

### Setup

1. Required dependencies installation

```
npm install
```

2. Open Cypress GUI

```
npm run cypress
```

3. Run tests in headed chrome or firefox without opening cypress GUI

```
npm run chrome
npm run firefox
```

### Features

1. if you want to run only specific tests like sanity or regression and skip other tests, then add below option for scripts in package.json file and make sure your test suite name contains the keyword.

```
--env grep='sanity'
```

### Note

By default it will run all the test cases which are available in cypress/e2e folder.
