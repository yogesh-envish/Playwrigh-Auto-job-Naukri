import { Actions } from '../utils/Actions.js';
import { Assertions } from '../utils/Assertions.js';

export class SearchJobPage {
  constructor(page) {
    this.page = page;
    this.actions = new Actions(page);
    this.assertions = new Assertions(page);
    this.expandSearchButton = page.getByRole('button', { name: 'Search jobs here' });
    this.jobSearchInput = page.getByRole('textbox', {
      name: 'Enter keyword, designation, or companies',
    });
    this.jobResults = page.locator('.srp-jobtuple-wrapper');
  }

  async searchJobs(jobTitle) {
    const searchTerm = jobTitle?.trim();
    if (!searchTerm) {
      throw new Error('A job title is required to search');
    }

    if (!(await this.jobSearchInput.isVisible())) {
      await this.actions.click(this.expandSearchButton);
    }

    await this.actions.clearandfill(this.jobSearchInput, searchTerm);
    await this.jobSearchInput.focus();
    await this.actions.pressKey('Enter');
    await this.actions.waitForVisible(this.jobResults.first());
    await this.assertions.assertElementVisible(this.jobResults.first());
  }

  async filterByLocation(location) {
    const searchLocation = location?.trim();
    if (!searchLocation) {
      throw new Error('A location is required to filter job results');
    }

    const locationFilter = this.page
      .locator('[data-filter-id="citiesGid"]')
      .getByText(searchLocation, { exact: true });
    await this.actions.click(locationFilter);
    await this.assertions.assertElementVisible(this.jobResults.first());
  }

  async filterByPostedDate(dateRange) {
    const searchDateRange = dateRange?.trim();
    if (!searchDateRange) {
      throw new Error('A posted-date range is required to filter job results');
    }

    const freshnessFilter = this.page.locator('#filter-freshness');
    await this.actions.click(freshnessFilter);
    const postedDateOption = this.page
      .locator('ul[data-filter-id="freshness"]')
      .getByText(searchDateRange, { exact: true });
    await this.actions.click(postedDateOption);
    await this.assertions.assertElementVisible(this.jobResults.first());
  }
}
