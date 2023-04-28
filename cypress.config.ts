import { defineConfig } from "cypress";

const runDate = new Date();
const resultFolder = String("results/D_" + runDate.getFullYear() + "-" + Number(runDate.getMonth() + 1) + "-" + runDate.getDate() + "_T_" + runDate.getHours() + ":" + runDate.getMinutes() + ":" + runDate.getSeconds());

export default defineConfig({
   viewportWidth: 1920,
   viewportHeight: 1080,
   defaultCommandTimeout: 5_000,
   pageLoadTimeout: 10_000,
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
      autoOpen: true,
      quiet: true,
      ignoreVideos: true,
   },

   e2e: {
      setupNodeEvents(on, config) {
         const options = {
            outputRoot: resultFolder,
            outputTarget: {
               "cypress-log.txt": "txt",
            },
            printLogsToFile: "always",
         };
         require("cypress-mochawesome-reporter/plugin")(on);
         require("cypress-terminal-report/src/installLogsPrinter")(on, options);
         return config;
      },
   },

   screenshotsFolder: resultFolder + "/screenshots",
   videosFolder: resultFolder + "/videos",
   downloadsFolder: resultFolder + "/donwloads",
});
