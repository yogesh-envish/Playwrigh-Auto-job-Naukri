import { test } from './basetestfixture.js';
import { readFileSync } from 'node:fs';

const jobDetails = JSON.parse(readFileSync('data/jobdetails.json', 'utf8'));

test.describe('Naukri login', () => {
  test('should allow users to login and search for jobs', async ({ loginPage, searchJobPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLoginPage();
    });
    await test.step('Enter credentials and login', async () => {
      await loginPage.login();
      await loginPage.isProfileIconVisible();
    });
    await test.step('Search for jobs and apply filters', async () => {
      await searchJobPage.searchJobs(jobDetails.jobTitle);
      //await searchJobPage.filterByLocation(jobDetails.location);
      //await searchJobPage.filterByPostedDate(jobDetails.postedDate);
    });
    await test.step('Logout', async () => {
      await loginPage.logout();
    });
  });
});