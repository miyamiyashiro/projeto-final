import { defineConfig } from '@playwright/test'
export default defineConfig({
 testDir:'./e2e',
 timeout:60000,
 workers:1,
 reporter:'list',
 use:{
  baseURL:process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:5198',
  browserName:'chromium',
  launchOptions:process.env.PLAYWRIGHT_EXECUTABLE_PATH ? {executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH} : {},
 },
})
