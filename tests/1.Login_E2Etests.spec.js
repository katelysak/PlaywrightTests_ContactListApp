const {test, expect} = require('@playwright/test');
const { HomePage } = require('../pages/homepage');
const { url } = require('inspector');
const { homedir } = require('os');
const { pathToFileURL } = require('url');

test.beforeEach('Run before each test', async({page}) => {
    const homepage = new HomePage(page);
    await page.goto(process.env.HOME_URL);
})

test('Check labels in the home page', async({page}) => {
    const homepage = new HomePage(page);

    await expect(homepage.headerText).toHaveText('Contact List App');
    await expect(homepage.welcomeText).toBeVisible();
    await expect(homepage.apiLinkText).toBeVisible();
    await expect(homepage.loginLabel).toBeVisible();
    await expect(homepage.signUpText).toBeVisible();
})

test('Correct footer logo and text are displayed', async({page}) => {
    const homepage = new HomePage(page);

    await homepage.footerCheck();
})

test('Link to the API Documentation is correct and clickable', async({page}) => {
    const homepage = new HomePage(page);

    await expect(homepage.linkToApiDocument).toBeVisible();
    await expect(homepage.linkToApiDocument).toHaveAttribute('href', process.env.API_DOCUMENTATION_URL);

    homepage.linkToApiDocument.click();
    await expect(page).toHaveURL(process.env.API_DOCUMENTATION_URL)
})

test('Login with valid credentials', async({page}) => {
    const homepage = new HomePage(page);
    
    await homepage.emailField.click();
    await homepage.emailField.fill(process.env.USER_NAME);
    await homepage.passwordField.click();
    await homepage.passwordField.fill(process.env.PASSWORD);
    await homepage.submitButton.click();

    await expect(homepage.headerText).toHaveText('Contact List');
})

test('Check validation for empty credentials in the login page', async({page}) => {
    const homepage = new HomePage(page);

    homepage.submitButton.click();
    await expect(homepage.error).toBeVisible();
})

test('Check validation for not valid credentials in the login page', async({page}) => {
    const homepage = new HomePage(page);

    homepage.emailField.click();
    homepage.emailField.fill(process.env.INVALID_USER_NAME);
    homepage.passwordField.click();
    homepage.passwordField.fill(process.env.INVALID_PASSWORD);
    homepage.submitButton.click();

    await expect(homepage.error).toHaveText('Incorrect username or password');
})





