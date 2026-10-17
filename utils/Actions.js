export class Actions {
  constructor(page) {
    this.page = page;
  }

  async click(locator) {
    await locator.click();
  }

  async clearandfill(locator, value) {
    await locator.clear();
    await locator.fill(value);
  }

  async typeText(locator, text) {
    await locator.pressSequentially(text);
  }

  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  async selectOption(locator, value) {
    await locator.selectOption(value);
  }

  async waitForVisible(locator) {
    await locator.waitFor({ state: 'visible' });
  }

  async getTextcontent(locator) {
    return await locator.textContent();
  }
}
