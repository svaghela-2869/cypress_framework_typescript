import { defineConfig } from "cypress";
// import * as utilsCommon from "./lib/common/utilsCommon";

const runDate = new Date();
const resultFolder = String("results/D" + runDate.getFullYear() + "-" + Number(runDate.getMonth() + 1) + "-" + runDate.getDate() + "T" + runDate.getHours() + "-" + runDate.getMinutes() + "-" + runDate.getSeconds());
// const resultFolder = utilsCommon.getTimestamp();

export default defineConfig({
   env: {
      requestMode: true,
      hideCredentials: true,
   },

   viewportWidth: 1920,
   viewportHeight: 1080,
   defaultCommandTimeout: 10_000,
   pageLoadTimeout: 25_000,
   chromeWebSecurity: false,
   videoCompression: false,

   reporter: "cypress-mochawesome-reporter",
   reporterOptions: {
      reportDir: resultFolder,
      reportFilename: "report-[status]",
      reportPageTitle: "Mochawesome",
      embeddedScreenshots: true,
      charts: true,
      html: true,
      json: true,
      overwrite: true,
      inlineAssets: true,
      saveAllAttempts: false,
      code: false,
      quiet: false,
      ignoreVideos: true,
      showPending: false,
      autoOpen: true,
   },

   e2e: {
      specPattern: "cypress/tests/**/*.spec.ts",

      setupNodeEvents(on, config) {
         const options = {
            outputRoot: resultFolder,
            outputTarget: {
               "cypress-log.txt": "txt",
            },
            printLogsToFile: "always",
         };
         require("cypress-terminal-report/src/installLogsPrinter")(on, options);
         require("cypress-mochawesome-reporter/plugin")(on);
         require("@cypress/grep/src/plugin")(config);
         return config;
      },
   },

   screenshotsFolder: resultFolder + "/screenshots",
   videosFolder: resultFolder + "/videos",
   downloadsFolder: resultFolder + "/donwloads",
});
