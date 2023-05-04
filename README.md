# Cypress Framework with Typescript

### Setup

1. Install Required Dependencies.

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

### Extra Features

1. To list all the available tests in your project, use below command.

```
npm run list-tests
```

2. If you want to run only specific tests like sanity or regression and skip other tests, then add below option for scripts in package.json file and make sure your test suite name contains the keyword.

```
--env grep='sanity'
```

### Note

1. All tests file should end with .spec.ts & it should be inside 'cypress/tests' folder.

2. By default it will run all the test cases which are available in cypress/e2e folder.
