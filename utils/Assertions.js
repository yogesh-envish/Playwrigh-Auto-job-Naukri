import { expect } from '@playwright/test';

export class Assertions {
  constructor(page) {
    this.page = page;
  }

  async assertElementVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async assertElementHidden(locator) {
    await expect(locator).toBeHidden();
  }

  async assertElementText(locator, expectedText) {
    await expect(locator).toHaveText(expectedText);
  }

  async assertPageTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async assertPageUrl(expectedUrl) {
    await expect(this.page).toHaveURL(expectedUrl);
  }
}
