FROM cypress/browsers

RUN mkdir /cypress-framework-typescript

WORKDIR /cypress-framework-typescript

COPY ./package.json .
COPY ./cypress.config.ts .
COPY ./cypress ./cypress

RUN npm install

ENTRYPOINT [ "npx", "cypress", "run"]

CMD [ "" ]