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

3. To run spec files, place spec file path in 'cypress-runner.txt' & run below commands based on requirenment.

```
npm run serial

npm run parallel
```

### Features

1. To list all the available tests in your project, use below command.

```
npm run list-tests
```

2. If you want to run only specific tests like sanity or regression and skip other tests, then add below below command and make sure your test suite name contains the keyword.

```
npx cypress run --env grep='random'
```

3. If you want to run tests in docker then use below command.

```
npm run docker-mac

npm run docker-win
```

### Note

1. All tests file should end with '.spec.ts' & it should be inside 'cypress/tests' folder.

2. If you want to run multiple spec files, then give all spec paths in 'cypress-runner.txt' file, each in new line. ( you can give folder path which contains spec files )

3. While running in docker, please make sure you have docker installed, keep that in mind that by default docker command will run all the test cases which are available in cypress/tests folder on chrome. if you want to change, then modify script accordingly.
