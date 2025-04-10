class ItemVerifier {
    constructor(page) {
        this.page = page;
        this.searchProperty = "//input[@placeholder='Search Property']";
        this.itemtab = "//img[@alt='Grid View']";
        this.todayDateData = "//tbody/tr/td[11]/div[1]";
        this.createditem = '//*[@id="root"]/div/div[2]/div/div/table/tbody/tr/td[11]/div[2]/div';
        this.stunningProperty = "//div[contains(@class,'listing-container')]";
        this.itemdescriptione = page.locator("p[class='text-sm text-primary-700']"); 
        this.contractornamee = page.locator("//*[text()='Contractor']/following::h3[contains(@class, 'text-brand-primary')][1]");
        this.ratee = page.locator("//div[@class='border text-card-foreground mt-2 flex justify-between items-center p-4 bg-primary-100 rounded-lg border-none shadow-none w-full']");
        this.threedots = "//button[@class='rounded-full bg-primary-100 p-2 hover:bg-primary-200 mx-4']//img[@alt='right icon']";
        this.deletebutton = '//*[contains(@id, "radix-")]//div[contains(@class, "cursor-default") and contains(@class, "flex")][2]';
        this.deleteitembutton = '//*[starts-with(@id, "radix-")]/div[3]/button[1]';
    }

    async navigateToItemListPage() {
        // Either go to item tab or wherever the item list appears
        await this.page.goto("https://test.propertystack-cdn.com/?importantOrgId=1685259606362x437519117363234200&token=bc5d679924fceda1f97778670739cc470c54&userId=1727751461519x198016365208826900"); // Replace with actual URL if different
        await this.page.waitForTimeout(5000); // or use waitForSelector
        await this.page.reload();
        await this.page.waitForTimeout(5000); 
        await this.page.fill(this.searchProperty, "Stunning Property");
        await this.page.waitForSelector(this.stunningProperty, { timeout: 10000 });
        await this.page.waitForTimeout(2000);
        await this.page.click(this.itemtab);
        
        await this.page.click(this.createditem);






        // const dateCell = await this.page.$(this.todayDateData);
        // const boundingBox = await dateCell.boundingBox();
        // await this.page.mouse.click(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);

        // await this.page.waitForSelector("//td[contains(@class, 'table-day-cell')]//div[contains(@class, 'add-options')]//p[contains(text(), '+ Add')]", { state: 'visible' });
        // await this.page.click("//td[contains(@class, 'table-day-cell')]//div[contains(@class, 'add-options')]//p[contains(text(), '+ Add')]");
    }

    async verifyItemExists() {
        const descriptionText = (await this.itemdescriptione.textContent())?.trim();
        const contractorNameText = (await this.contractornamee.textContent())?.trim();
        const rateText = (await this.ratee.textContent())?.trim();

        console.log('Description:', descriptionText);
        console.log('Contractor:', contractorNameText);
        console.log('Rate:', rateText);


        return {
            description: descriptionText,
            contractor: contractorNameText,
            rate: rateText
        };
        
    }
    async deleteItem() {
        await this.page.click(this.threedots);
        await this.page.click(this.deletebutton);
        await this.page.waitForTimeout(5000);
        await this.page.click(this.deleteitembutton);
        await this.page.locator("//div[contains(text(), 'Item deleted successfully')]").waitFor({ state: 'attached' });


        console.log('Item deleted successfully.');
    }
    
    
}

module.exports = { ItemVerifier };
