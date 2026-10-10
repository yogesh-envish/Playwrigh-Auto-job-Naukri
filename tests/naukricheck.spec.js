import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginpage';

test('Naukri login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.login();
  await loginPage.isProfileIconVisible();
  await loginPage.logout();
});