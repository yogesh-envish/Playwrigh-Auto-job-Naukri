export class Actions {
  constructor(page) {
    this.page = page;
  }

  async click(locator) {
    await locator.click();
  }

  async clearandfill(locator, value) {
    await locator.fill(value);
    const enteredValue = await locator.inputValue();
    if (enteredValue !== value) {
      throw new Error(
        `Input value length mismatch: expected ${value.length}, received ${enteredValue.length}`,
      );
    }
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
}
