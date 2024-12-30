const { expect } = require('playwright/test')

exports.HomePage = class HomePage {

    /**
     * 
     * @param {import ('playwright/test').Page } page 
     */
    constructor(page){
        this.page = page

        this.headerText = page.getByRole('heading', { name: 'Contact List App' });
    }

    async goto() {
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/')
    }
}