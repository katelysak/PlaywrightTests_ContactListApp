const { expect } = require('playwright/test')

exports.HomePage = class HomePage {

    /**
     * 
     * @param {import ('playwright/test').Page } page 
     */
    constructor(page){
        this.page = page

        this.headerText = page.locator('//h1');
        this.emailField = page.locator('#email')
        this.passwordField = page.locator('#password')
        this.submitButton = page.locator('#submit')
        this.signUpButton = page.locator('#signup')
        this.signUpButton = page.locator('//button[text()="Sign up"]')
        this.error = page.locator('#error')
        this.firstName = page.locator('#firstName')
        this.lastName = page.locator('#lastName')
        this.logo = page.locator('img')
        this.linkToApiDocument = page.locator('//a[text()="here"]')
        this.welcomeText = page.locator('//div[normalize-space(text())="Welcome! This application is for testing purposes only. The database will be purged as needed to keep costs down."]')
        this.apiLinkText = page.locator('//div[contains(normalize-space(.), "The API documentation can be found")]')
        this.loginLabel = page.locator('//*[(text()="Log In:")]')
        this.signUpText = page.locator('//*[(text()="Not yet a user? Click here to sign up!")]')
        this.footerText = page.locator('//footer/p')
        // this.emptyFiendsValidation = page.locator('//span[normalize-space(text())="User validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required."]')
    }//span[contains(normalize-space(.), "User validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required.")

    // async goto(url) {
    //     await this.page.goto(url)
    // }

    async labelIsVisible(param1) {
        await expect(this.page.getByText(param1)).toBeVisible();
    }
}