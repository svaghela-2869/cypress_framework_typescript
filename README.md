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

3. Run tests in headed chrome without opening cypress GUI, change browser in script if you want to run in firefox.

```
npm test
```

### Features

1. To list all the available tests in your project, use below command.

```
npm run list-tests
```

2. If you want to run only specific tests like sanity or regression and skip other tests, then add below option for scripts in package.json file and make sure your test suite name contains the keyword.

```
--env grep='sanity'
```

3. If you want to run tests in docker then use below command.

```
npm run docker-mac

npm run docker-win
```

### Note

1. All tests file should end with .spec.ts & it should be inside 'cypress/tests' folder.

2. By default it will run all the test cases which are available in cypress/tests folder.

3. While running in docker, please make sure you have docker installed, keep that in mind that by default docker will run all the test cases which are available in cypress/tests folder on chrome. if you want to change, then modify script accordingly.
