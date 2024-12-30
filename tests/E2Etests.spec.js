const {test, expect} = require('playwright/test');

test.beforeEach('Run before each test', async({page}) => {
    // console.log('Running before all tests...!')
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
})

test('Check labels in the home page', async({page}) => {
    // await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

    await expect(page.getByRole('heading', { name: 'Contact List App' })).toBeVisible();
    await expect(page.getByText('Welcome! This application is')).toBeVisible();
    await expect(page.getByText('The API documentation can be found')).toBeVisible();
    await expect(page.getByText('Log In:')).toBeVisible();
    await expect(page.getByText('Not yet a user? Click here to')).toBeVisible();
    await expect(page.getByText('Created by Kristin Jackvony,')).toBeVisible();

})

test('Correct logo is displayed', async({page}) => {

    await expect(page.getByRole('img')).toHaveAttribute('src' , '/img/thinkingTesterLogo.png');
})

test('Link to the API Documentation is correct and clickable', async({page}) => {

    await expect(page.getByRole('link', { name: 'here' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'here' })).toHaveAttribute('href', 'https://documenter.getpostman.com/view/4012288/TzK2bEa8');

    await page.getByRole('link', { name: 'here' }).click();
    await expect(page).toHaveURL('https://documenter.getpostman.com/view/4012288/TzK2bEa8')
})

test('Check validation for empty credentials in the login page', async({page}) => {

    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Incorrect username or password')).toBeVisible();
})

test('Check validation for not valid credentials in the login page', async({page}) => {

    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('test1');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('test2');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Incorrect username or password')).toBeVisible();
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

test('Validation for empty fields in the sign up page', async({page}) => {

    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('User validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required.')).toBeVisible();
})

test('Validation for the already signed up user', async({page}) => {

    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('Anna');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('Smith');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('anna_smith@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Password12345!');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Email address is already in')).toBeVisible();
})

test('Login with valid credentials', async({page}) => {
  
    await page.getByPlaceholder('Email').fill('anna_smith@gmail.com');
    await page.getByPlaceholder('Password').fill('Password12345!');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Password').click();

    await expect(page.getByText('Contact List')).toBeVisible();
})