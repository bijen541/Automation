const { expect } = require('@playwright/test');

class ItemManager {
    constructor(page) {
        this.page = page;

        // Locators
        this.searchProperty = "//input[@placeholder='Search Property']";
        this.stunningProperty = "//div[contains(@class,'listing-container')]";
        this.todayDateData = "//tbody/tr/td[11]/div[1]";
        this.itemtab = "//button[normalize-space(text())='Item']";
        this.rate = '//*[@id="rate"]';
        this.contractordp = '//*[@id="contractor"]';
        this.searchcontractor = "//input[@type='search' and @placeholder='Search Contractor']";
        this.contractorOption = "(//div[contains(@class, 'custom-scrollbar')]//div[contains(@class, 'cursor-pointer')])[1]";
        this.selectcontractor = "//div[contains(@id, 'radix-')]//div[4]//button[contains(text(), 'Select Contractor')]";
        this.assigneedp = "(//div[contains(@id, 'radix-') and contains(@id, '-content-item')]//div[2]/div[3]/div[last()])[1]";
        this.assigneeOption = "(//div[contains(@id, 'radix-') and contains(@id, '-content-item')]//div[2]/div[3]//div[contains(@class,'cursor-pointer')])[1]";
        this.createitem = "//div[contains(@id, 'radix-') and contains(@id, '-content-item')]//div[2]/button[contains(text(), 'Create Item')]";
        this.assignee = "(//div[contains(@id, 'radix-') and contains(@id, '-content-item')]//div[2]/div[3]/div/div[2]/div[2]/div[1]/div/div)[1]";
    }

    async navigateToItemPage() {
        await this.page.goto("https://test.propertystack-cdn.com/?importantOrgId=1685259606362x437519117363234200&token=bc5d679924fceda1f97778670739cc470c54&userId=1727751461519x198016365208826900");
        await this.page.waitForTimeout(10000);
    }

    async createNewItem({ rate, contractorName }) {
        await this.page.click(this.searchProperty);
        await this.page.fill(this.searchProperty, "Stunning Property");
        await this.page.waitForSelector(this.stunningProperty, { timeout: 10000 });
        await this.page.waitForTimeout(2000);

        const dateCell = await this.page.$(this.todayDateData);
        const boundingBox = await dateCell.boundingBox();
        await this.page.mouse.click(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);

        await this.page.waitForSelector("//td[contains(@class, 'table-day-cell')]//div[contains(@class, 'add-options')]//p[contains(text(), '+ Add')]", { state: 'visible' });
        await this.page.click("//td[contains(@class, 'table-day-cell')]//div[contains(@class, 'add-options')]//p[contains(text(), '+ Add')]");

        await this.page.click(this.itemtab);
        await this.page.fill(this.rate, rate);

        await this.page.click(this.contractordp);
        await this.page.fill(this.searchcontractor, contractorName);
        await this.page.waitForTimeout(1000);
        await this.page.click(this.contractorOption);
        await this.page.click(this.selectcontractor);

       
        await this.page.click(this.assigneedp);
        await this.page.click(this.assignee)

        await this.page.click(this.createitem);
        await this.page.waitForTimeout(5000);

        await this.page.pause();
    }
}

module.exports = { ItemManager };
