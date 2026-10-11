import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginpage.js';
import { SearchJobPage } from '../Pages/searchjob.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  searchJobPage: async ({ page }, use) => {
    await use(new SearchJobPage(page));
  },
});

export { expect };