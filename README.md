# Naukri Job Search Automation

This project uses Playwright to automate parts of a Naukri job-search workflow. The goal is to make it easier to find relevant jobs and, as the project grows, automate selected parts of the application process.

## Current functionality

The main test in `tests/naukricheck.spec.js` currently:

1. Opens Naukri using the configured base URL.
2. Logs in using credentials from environment variables.
3. Searches for the configured job title.
4. Logs out.

The search page also has methods for filtering results by location and posted date. Those calls are currently commented out in the main test. Automatic job application submission is **not implemented yet**; review job details and apply manually until an application flow has been added and verified.

## Requirements

- Node.js (use an active LTS release)
- npm
- A Naukri account for login tests

## Setup

Install the project dependencies and the Chromium browser used by the Playwright configuration:

```bash
npm ci
npx playwright install chromium
```

Create a `.env` file in the repository root with your own values:

```dotenv
baseurl=https://www.naukri.com/
useremail=your-account-email
password=your-account-password
```

Keep credentials private. `.env` is ignored by Git; do not commit it or paste real credentials into source files.

## Configure the job search

Edit `data/jobdetails.json` to select search parameters:

```json
{
  "jobTitle": "playwright javascript",
  "Experience": "2-3 years",
  "location": "Bengaluru",
  "postedDate": "Last 7 days"
}
```

The current login/search test reads `jobTitle`. The location and posted-date values are available to the filter methods, but their calls are commented out in `tests/naukricheck.spec.js`. To enable them, uncomment:

```js
await searchJobPage.filterByLocation(jobDetails.location);
await searchJobPage.filterByPostedDate(jobDetails.postedDate);
```

The `Experience` property is currently informational and is not applied as a filter.

## Run tests

Run the login and job-search workflow:

```bash
npx playwright test tests/naukricheck.spec.js
```

List the tests without running them:

```bash
npx playwright test --list
```

Open the HTML report after a test run:

```bash
npx playwright show-report
```

By default the local browser is headed. Set `headless=true` in `.env` to run headlessly. The Playwright configuration also accepts `browserName` to name the configured browser project; Chromium is the configured browser.

## Project layout

```text
Pages/
  loginpage.js       Naukri login and logout actions
  searchjob.js       Job search and result-filter actions
tests/
  basetestfixture.js Shared Playwright page-object fixtures
  naukricheck.spec.js Login and job-search workflow
  example.spec.js    Playwright starter examples
utils/
  Actions.js         Reusable browser interactions
  Assertions.js      Reusable Playwright assertions
data/
  jobdetails.json    Search input data
playwright.config.ts Playwright and environment configuration
```

## GitHub Actions

The workflow in `.github/workflows/playwright.yml` can be started manually with `workflow_dispatch`. Configure the repository secrets `BASEURL`, `USEREMAIL`, and `PASSWORD` before running it. The workflow installs dependencies and browsers, runs `tests/naukricheck.spec.js`, and uploads the Playwright HTML report.

## Harness CI

The pipeline in `.harness/profile-headline-ci.yaml` runs `tests/Autoupdate.spec.js`. Before importing or running it in Harness, replace `YOUR_ORG_ID`, `YOUR_PROJECT_ID`, `YOUR_DOCKERHUB_CONNECTOR_ID`, and `YOUR_KUBERNETES_CONNECTOR_ID` with your Harness identifiers. Create Harness secrets named `BASEURL`, `USEREMAIL`, and `PASSWORD` for the corresponding Naukri login values. The pipeline expects Harness Kubernetes CI infrastructure and a Docker connector that can pull `node:22-bookworm`.

## Responsible use

This project currently automates login and job search only. It does not submit applications. Any future application-submission automation should be tested carefully and used in accordance with Naukri's terms and the account owner's intent. Review each job and application before submitting.
