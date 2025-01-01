const { expect } = require('playwright/test')

exports.ContactsPage = class ContactsPage {

    /**
     * 
     * @param {import ('playwright/test').Page } page 
     */
    constructor(page){
        this.page = page

        this.firstName = page.locator('#firstName')
        this.lastName = page.locator('#lastName')
        this.emailField = page.locator('#email')
        this.submitButton = page.locator('#submit')
        this.contactsText = page.locator('//*[(text()="Click on any contact to view the Contact Details")]')
        this.addContactButton = page.locator('#add-contact')
        this.birthdayField = page.locator('#birthdate')
        this.phoneField = page.locator('#phone')
        this.addressField1 = page.locator('#street1')
        this.addressField2 = page.locator('#street2')
        this.cityField = page.locator('#city')
        this.provinceField = page.locator('#stateProvince')
        this.postalCodeField = page.locator('#postalCode')
        this.countryField = page.locator('#country')
        this.headerText = page.locator('//h1');
        this.lastTableRecord = page.locator('//table/tr[last()]')
        this.deleteButton = page.locator('#delete')
        this.logoutButton = page.locator('#logout')

    }

    async footerCheck() {
        await expect(this.page.locator('//footer/p')).toBeVisible();
        await expect(this.page.locator('img')).toHaveAttribute('src' , '/img/thinkingTesterLogo.png');
    }

    async confirmAlert() {
        this.page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept(); // Confirm the alert
        });
    }
}