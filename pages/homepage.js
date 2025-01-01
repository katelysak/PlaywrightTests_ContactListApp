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


    }

    async labelIsVisible(param1) {
        await expect(this.page.getByText(param1)).toBeVisible();
    }

    async footerCheck() {
        await expect(this.page.locator('//footer/p')).toBeVisible();
        await expect(this.page.locator('img')).toHaveAttribute('src' , '/img/thinkingTesterLogo.png');
    }
}