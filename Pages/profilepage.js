import { Actions } from '../utils/Actions.js';
import { Assertions } from '../utils/Assertions.js';

export class ProfilePage {
    constructor(page) {
        this.page = page;
        this.actions = new Actions(page);
        this.assertions = new Assertions(page);
        this.viewProfileLink = page.getByRole('link', { name: 'View & Update Profile' });
        this.resumeHighlightListOption = page.getByRole('listitem').filter({ hasText: 'Resume headline' });
        this.editbutton = page.getByRole('button', { name: 'Edit resume headline' });
        this.textarea = page.locator('#resumeHeadlineTxt');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.successMessage = page.getByText('Profile updated successfully');
        this.closebtn = page.getByRole('button', { name: 'Close' });
    }

    async viewAndUpdateProfile() {
        await this.actions.waitForVisible(this.viewProfileLink);
        await this.actions.click(this.viewProfileLink);
    }

    async updateResumeHeadline(regular, newHeadline) {
        await this.actions.waitForVisible(this.resumeHighlightListOption);
        await this.actions.click(this.resumeHighlightListOption);
        await this.actions.waitForVisible(this.editbutton);
        await this.actions.click(this.editbutton);
        const resumeHeadlineInput = await this.actions.getTextcontent(this.textarea);
        if (resumeHeadlineInput == regular) {
            await this.actions.clearandfill(this.textarea, newHeadline);
        } else {
            await this.actions.clearandfill(this.textarea, regular);
        }
    }

    async saveResumeHeadline() {
        await this.actions.click(this.saveButton);
    }

    async validatesuccessmessage() {
        await this.actions.waitForVisible(this.successMessage);
        await this.assertions.assertElementText(this.successMessage, 'Profile updated successfully');
    }

    async closeSuccessMessage() {
        await this.actions.click(this.closebtn);
    }
}