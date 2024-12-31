const {test, expect} = require('@playwright/test');
const { HomePage } = require('../pages/homepage');
const { url } = require('inspector');
const { homedir } = require('os');
const { pathToFileURL } = require('url');

test.beforeEach('Run before each test', async({page}) => {
    const homepage = new HomePage(page);
    await page.goto(process.env.HOME_URL);
})

test('Validation for empty fields in the sign up page', async({page}) => {
    const homepage = new HomePage(page);

    homepage.signUpButton.click();
    homepage.submitButton.click();

    await expect(homepage.error).toBeVisible();
})

test('Validation for the already signed up user', async({page}) => {
    const homepage = new HomePage(page);

    await homepage.signUpButton.click();
    
    await homepage.firstName.click();
    await homepage.firstName.fill('Anna');
    await homepage.lastName.click();
    await homepage.lastName.fill('Smith');
    await homepage.emailField.click();
    await homepage.emailField.fill(process.env.USER_NAME);
    await homepage.passwordField.click();
    await homepage.passwordField.fill(process.env.PASSWORD);
    await homepage.submitButton.click();

    await expect(homepage.error).toHaveText('Email address is already in use');
})

// test('Sign up a new user', async({page}) => {
//     await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

//     await page.getByRole('button', { name: 'Sign up' }).click();
//     await page.getByPlaceholder('First Name').click();
//     await page.getByPlaceholder('First Name').fill('Anna');
//     await page.getByPlaceholder('Last Name').click();
//     await page.getByPlaceholder('Last Name').fill('Smith');
//     await page.getByPlaceholder('Email').click();
//     await page.getByPlaceholder('Email').fill('anna_smith@gmail.com');
//     await page.getByPlaceholder('Password').click();
//     await page.getByPlaceholder('Password').fill('Password12345!');
//     await page.getByRole('button', { name: 'Submit' }).click();
//     await page.getByRole('button', { name: 'Submit' }).click();
// })