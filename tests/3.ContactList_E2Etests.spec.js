const {test, expect} = require('@playwright/test');
const { HomePage } = require('../pages/homepage');
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
    const homepage = new HomePage(page);

    await expect(homepage.headerText).toHaveText('Contact List');
    await expect(homepage.contactsText).toBeVisible();
})

test('Add new contact', async({page}) => {
    const homepage = new HomePage(page);

    await homepage.addContactButton.click();

    await homepage.firstName.fill('Mike');
    await homepage.lastName.fill('Adams');
    await homepage.birthdayField.fill('1986-01-27');
    await homepage.emailField.fill('test@gmail.com');
    await homepage.phoneField.fill('4376443271');
    await homepage.addressField1.fill('App 309');
    await homepage.addressField2.fill('34 Green St.');
    await homepage.cityField.fill('Toronto');
    await homepage.provinceField.fill('Ontario');
    await homepage.postalCodeField.fill('M3P 5B4');
    await homepage.countryField.fill('Canada');

    await homepage.submitButton.click();

    // fix later
    await expect(page.getByRole('cell', { name: 'Mike Adams' }).first()).toHaveText('Mike Adams')
})

test('Delete contact', async({page}) => {
    const homepage = new HomePage(page);

    await homepage.lastTableRecord.click();
    await homepage.deleteButton.click();
})

test('Correct footer logo and text are displayed', async({page}) => {
    const homepage = new HomePage(page);

    await homepage.footerCheck();
})