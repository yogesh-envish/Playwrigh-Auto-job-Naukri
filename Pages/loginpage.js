import { Actions } from '../utils/Actions.js';


export class LoginPage {
    constructor(page) {
        this.page = page;
        this.actions = new Actions(page);
        this.usernameField = this.page.locator('#usernameField');
        this.passwordField = this.page.locator('#passwordField');
        this.loginButton = this.page.locator('(//button[text()="Login"])[1]');
        this.profileIcon = this.page.locator('button.nI-gNb-drawer__icon');
        this.logoutButton = this.page.locator('//a[@title="Logout"]');
    }

    async navigateToLoginPage() {
        const baseUrl = process.env.baseurl;
        if (!baseUrl) {
            throw new Error('baseurl environment variable is not set');
        }
        await this.page.goto(baseUrl);
    }

    async login(useremail = process.env.useremail, password = process.env.password) {
        if (!useremail || !password) {
            throw new Error('useremail and password environment variables must be set');
        }
        await this.actions.clearandfill(this.usernameField, useremail);
        await this.actions.clearandfill(this.passwordField, password);
        await this.actions.click(this.loginButton);
    }

    async isProfileIconVisible() {
        await this.actions.waitForVisible(this.profileIcon);
    }

    async logout() {
        await this.actions.click(this.profileIcon);
        await this.actions.click(this.logoutButton);
    }
}