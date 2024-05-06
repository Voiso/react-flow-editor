/* eslint-disable */

import { defineConfig } from "cypress"

export const getHost = () => (process.env.UNDER_DOCKER ? "http://flow-editor:5173" : "http://localhost:3000")

export default defineConfig({
  projectId: "XXX",
  fileServerFolder: process.env.UNDER_DOCKER ? "./packages/e2e" : "./",
  pageLoadTimeout: 100000,
  modifyObstructiveCode: false,
  chromeWebSecurity: false,
  video: false,
  screenshotOnRunFailure: false,
  watchForFileChanges: true,
  env: {
    HOST: getHost()
  },
  e2e: {
    baseUrl: getHost(),
    specPattern: "**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "./cypress/support/index.ts"
  }
})
