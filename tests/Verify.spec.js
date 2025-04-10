const { test, expect } = require('@playwright/test');
const { ItemManager } = require('../pages/Itemmc');
const { ItemVerifier } = require('../pages/Verifyitem');

test('Create item and verify its presence in the list', async ({ page }) => {
    const itemManager = new ItemManager(page);
    const itemVerifier = new ItemVerifier(page);

    // Step 1: Create the item
    await itemManager.navigateToItemPage();
    await itemManager.createNewItem({
        rate: '150',
        contractorName: 'ritikaawale'
    });

   
    // Step 2: Navigate to item list and verify
    await itemVerifier.navigateToItemListPage();

    // Get the item details from the page
    const { description, contractor, rate } = await itemVerifier.verifyItemExists();

    // Now perform the assertions
    expect(description).toBe("N/A");
    expect(contractor).toBe("Ritika Express Clean");
    expect(rate).toContain("$150.00");

    await itemVerifier.deleteItem();


    // expect(isItemPresent).toBeTruthy();
    // console.log('✅ Created item is displayed with correct details.');
});
