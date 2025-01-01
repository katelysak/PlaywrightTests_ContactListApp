const {test, expect} = require('@playwright/test');
const { HomePage } = require('../pages/homepage');
const { ContactsPage } = require('../pages/contactspage');
const { url } = require('inspector');
const { homedir } = require('os');
const { pathToFileURL } = require('url');

test.beforeEach('Run before each test', async({page}) => {
    const homepage = new HomePage(page);
    await page.goto(process.env.HOME_URL);

    await homepage.emailField.click();
    await homepage.emailField.fill(process.env.USER_NAME);
    await homepage.passwordField.click();
    await homepage.passwordField.fill(process.env.PASSWORD);
    await homepage.submitButton.click();
})

test('Check labels and buttons displayed in the contacts page', async({page}) => {
    const contactspage = new ContactsPage(page);

    await expect(contactspage.headerText).toHaveText('Contact List');
    await expect(contactspage.contactsText).toBeVisible();
})

test('Add new contact', async({page}) => {
    const contactspage = new ContactsPage(page);

    await contactspage.addContactButton.click();
    await expect(page).toHaveURL(process.env.ADD_CONTACT_URL)

    await contactspage.firstName.fill('Mike');
    await contactspage.lastName.fill('Adams');
    await contactspage.birthdayField.fill('1986-01-27');
    await contactspage.emailField.fill('test@gmail.com');
    await contactspage.phoneField.fill('4376443271');
    await contactspage.addressField1.fill('App 309');
    await contactspage.addressField2.fill('34 Green St.');
    await contactspage.cityField.fill('Toronto');
    await contactspage.provinceField.fill('Ontario');
    await contactspage.postalCodeField.fill('M3P 5B4');
    await contactspage.countryField.fill('Canada');

    await contactspage.submitButton.click();

    // fix later
    await expect(page.getByRole('cell', { name: 'Mike Adams' }).first()).toHaveText('Mike Adams')
})

test('Update contact', async({page}) => {
    const contactspage = new ContactsPage(page);

    await contactspage.lastTableRecord.click();
    await contactspage.editContactButton.click()

    await expect(page).toHaveURL(process.env.EDIT_CONTACT_URL)

    await contactspage.firstName.click();
    await contactspage.firstName.fill('Michael');
    await contactspage.lastName.click();
    await contactspage.lastName.fill('Adamson');
    await contactspage.birthdayField.click();
    await contactspage.birthdayField.fill('1987-01-28');
    await contactspage.emailField.click();
    await contactspage.emailField.fill('test2@gmail.com');
    await contactspage.phoneField.click();
    await contactspage.phoneField.fill('4371111111');
    await contactspage.addressField1.click();
    await contactspage.addressField1.fill('App 3099');
    await contactspage.addressField2.click();
    await contactspage.addressField2.fill('344 Green St.');
    await contactspage.cityField.click();
    await contactspage.cityField.fill('London');
    await contactspage.provinceField.click();
    await contactspage.provinceField.fill('');
    await contactspage.postalCodeField.click();
    await contactspage.postalCodeField.fill('HA3 0JA');
    await contactspage.countryField.click();
    await contactspage.countryField.fill('United Kingdom');

    await contactspage.submitButton.click();

    await contactspage.returnButton.click();
    // // fix later
    await expect(page.getByRole('cell', { name: 'Michael Adamson' }).first()).toHaveText('Michael Adamson')
})

test('Delete contact', async ({ page }) => {
    const contactspage = new ContactsPage(page);

    // Set up the dialog event listener before triggering the dialog
    await contactspage.confirmAlert();

    await contactspage.lastTableRecord.click();
    await contactspage.deleteButton.click();

    await expect(page).toHaveURL(process.env.CONTACTS_URL)
});

test('Correct footer logo and text are displayed', async({page}) => {
    const contactspage = new ContactsPage(page);

    await contactspage.footerCheck();
})