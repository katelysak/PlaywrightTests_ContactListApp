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

    }

    // async goto(url) {
    //     await this.page.goto(url)
    // }

    async labelIsVisible(param1) {
        await expect(this.page.getByText(param1)).toBeVisible();
    }
}