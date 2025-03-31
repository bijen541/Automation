const { expect } = require('@playwright/test');

class ItemManager {
    constructor(page) {
        this.page = page;

        // Locators
        this.searchItem = "//input[@placeholder='Search Item']";
        this.addItemButton = "//button[contains(text(), 'Add Item')]";
        this.itemNameField = "//input[@id='item-name']";
        this.itemCategoryDropdown = "//select[@id='item-category']";
        this.itemPriceField = "//input[@id='item-price']";
        this.itemDescriptionField = "//textarea[@id='item-description']";
        this.createItemButton = "//button[contains(text(), 'Create Item')]";
    }

    async navigateToItemPage() {
        console.log("Navigating to Item Management page...");
        await this.page.goto("https://test.propertystack-cdn.com/");
        await this.page.waitForTimeout(3000);
    }

    async createNewItem(itemName, category, price, description) {
        console.log("Starting item creation process...");
        await this.page.click(this.addItemButton);
        await this.page.waitForSelector(this.itemNameField, { state: 'visible', timeout: 5000 });

        await this.page.fill(this.itemNameField, itemName);
        await this.page.selectOption(this.itemCategoryDropdown, category);
        await this.page.fill(this.itemPriceField, price);
        await this.page.fill(this.itemDescriptionField, description);
        
        await this.page.click(this.createItemButton);
        console.log("Item created successfully.");
    }
}

class ItemDetails {
    constructor(page) {
        this.page = page;
        this.searchItem = "//input[@placeholder='Search Item']";
        this.itemList = "//div[contains(@class,'item-list-container')]";
        this.itemDetailsButton = "//button[contains(text(), 'View Details')]";
        this.itemName = "//h1[@id='item-name-display']";
        this.itemCategory = "//span[@id='item-category-display']";
        this.itemPrice = "//span[@id='item-price-display']";
        this.itemDescription = "//p[@id='item-description-display']";
    }
    
    async openItemDetails(itemName) {
        await this.page.fill(this.searchItem, itemName);
        await this.page.waitForTimeout(2000);
        await this.page.click(this.itemDetailsButton);
    }
    
    async getItemDetails() {
        await this.page.waitForSelector(this.itemName, { state: 'visible', timeout: 5000 });
        const name = await this.page.locator(this.itemName).textContent();
        const category = await this.page.locator(this.itemCategory).textContent();
        const price = await this.page.locator(this.itemPrice).textContent();
        const description = await this.page.locator(this.itemDescription).textContent();
        return { name: name.trim(), category: category.trim(), price: price.trim(), description: description.trim() };
    }
}

module.exports = { ItemManager, ItemDetails };