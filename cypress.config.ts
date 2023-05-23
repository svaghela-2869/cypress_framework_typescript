import { defineConfig } from "cypress";

const runDate = new Date();
const resultFolder = "results/" + String(runDate.getFullYear() + "_" + String(Number(runDate.getMonth() + 1)).padStart(2, "0") + "_" + String(runDate.getDate()).padStart(2, "0") + "T" + String(runDate.getHours()).padStart(2, "0") + "_" + String(runDate.getMinutes()).padStart(2, "0") + "_" + String(runDate.getSeconds()).padStart(2, "0") + "_" + String(runDate.getMilliseconds()).padStart(3, "0"));

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
   // retries: 2,

   reporter: "cypress-mochawesome-reporter",
   reporterOptions: {
      reportDir: resultFolder,
      reportFilename: "cypress-[status]-report",
      reportPageTitle: "Mochawesome",
      embeddedScreenshots: true,
      charts: true,
      html: true,
      json: true,
      overwrite: true,
      inlineAssets: true,
      saveAllAttempts: false,
      code: false,
      quiet: true,
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
               "cypress-terminal-log.txt": "txt",
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
