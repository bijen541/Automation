const { test, expect } = require('@playwright/test');
const { ItemManager } = require('../pages/Itemmc');

test.describe('Item Creation Tests with Edge Cases', () => {

    test('Positive Test: Valid rate, contractor and assignee', async ({ page }) => {
        const itemManager = new ItemManager(page);
        await itemManager.navigateToItemPage();

        await itemManager.createNewItem({
            rate: '100',
            contractorName: 'ritikaawale',
            
        });

        console.log("✅ Item created with valid inputs.");
    });

    test('Negative Test: Rate with alphabets', async ({ page }) => {
        const itemManager = new ItemManager(page);
        await itemManager.navigateToItemPage();

        await itemManager.createNewItem({
            rate: 'abc123',
            contractorName: 'ritikaawale',
            
        });

        const errorVisible = await page.locator("//p[normalize-space()='Rate is required.']").isVisible();
        expect(errorVisible).toBeTruthy();
        console.log("❌ Item creation failed due to alphabetic characters in rate.");
    });

    test('Negative Test: Rate with special characters', async ({ page }) => {
        const itemManager = new ItemManager(page);
        await itemManager.navigateToItemPage();

        await itemManager.createNewItem({
            rate: '!@#$%',
            contractorName: 'ritikaawale',
           
        });

        const errorVisible = await page.locator("//p[normalize-space()='Rate is required.']").isVisible();
        expect(errorVisible).toBeTruthy();
        console.log("❌ Item creation failed due to special characters in rate.");
    });

    test('Negative Test: Rate field left empty', async ({ page }) => {
        const itemManager = new ItemManager(page);
        await itemManager.navigateToItemPage();

        await itemManager.createNewItem({
            rate: '',
            contractorName: 'ritikaawale',
    
        });

        const errorVisible = await page.locator("//div[contains(text(),'Rate is required')]").isVisible();
        expect(errorVisible).toBeTruthy();
    });

    test('Negative Test: Rate with only whitespaces', async ({ page }) => {
        const itemManager = new ItemManager(page);
        await itemManager.navigateToItemPage();

        await itemManager.createNewItem({
            rate: '   ',
            contractorName: 'ritikaawale',
        });

        const errorVisible = await page.locator("//p[normalize-space()='Rate is required.']").isVisible();
        expect(errorVisible).toBeTruthy();
    });

    test('Boundary Test: Extremely large number for rate', async ({ page }) => {
        const itemManager = new ItemManager(page);
        await itemManager.navigateToItemPage();

        await itemManager.createNewItem({
            rate: '999999999999',
            contractorName: 'ritikaawale',
        
        });

        console.log("🧪 Tested with extremely large rate value.");
    });

    test('Boundary Test: Rate with decimal value', async ({ page }) => {
        const itemManager = new ItemManager(page);
        await itemManager.navigateToItemPage();

        await itemManager.createNewItem({
            rate: '99.99',
            contractorName: 'ritikaawale',
        
        });

        console.log("🧪 Tested with decimal rate.");
    });

});
