const { expect } = require('playwright/test')

exports.HomePage = class HomePage {

    /**
     * 
     * @param {import ('playwright/test').Page } page 
     */
    constructor(page){
        this.page = page
    }

}