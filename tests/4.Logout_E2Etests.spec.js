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

test('Logout', async({page}) => {
    const contactspage = new ContactsPage(page);
    const homepage = new HomePage(page);

    await contactspage.logoutButton.click();

    await expect(homepage.headerText).toHaveText('Contact List App');
    await expect(page).toHaveURL(process.env.HOME_URL)
})