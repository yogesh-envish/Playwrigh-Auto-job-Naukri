import { test } from './basetestfixture.js';
import { readFileSync } from 'node:fs';

const jobDetails = JSON.parse(readFileSync('data/jobdetails.json', 'utf8'));

test.describe('Naukri login', () => {
  test('should allow users to login and search for jobs', async ({ loginPage, profilePage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.navigateToLoginPage();
    });

    await test.step('Enter credentials and login', async () => {
      await loginPage.login();

    });

    await test.step('update profile in profile section', async () => {
      await loginPage.isProfileIconVisibleandClick();
      await profilePage.viewAndUpdateProfile();
      await profilePage.updateResumeHeadline(jobDetails.resumeHeadline1, jobDetails.regular);
      await profilePage.saveResumeHeadline();
      await profilePage.validatesuccessmessage();
      await profilePage.closeSuccessMessage();
    });

    await test.step('Logout', async () => {
      await loginPage.isProfileIconVisibleandClick();
      await loginPage.logout();
    });
    
  });
});