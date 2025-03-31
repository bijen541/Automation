class EditResMC  {
    constructor(page) {
        this.page = page;
        this.editButton = "//h6[normalize-space()='Edit Reservation']";
        this.guestCountInput = 'input[id="Search_Input_Add_User"]';
        this.saveButton = 'button.bubble-element.Button.baTaYaBaF';
        this.status = 'select.bubble-element.Dropdown';
        this.searchProperty = "//input[@placeholder='Search Property']";
        this.stunningProperty = "//div[contains(@class,'listing-container')]";
        this.nextmontharrow = "//img[@alt='right icon']"
        this.todayDateData = "//tbody/tr/td[9]/div[1]";
        this.channel = '//*[@id="radix-:rk1:-content-reservation"]/div[2]/div[2]/button';
        this.addReservationButton = '//*[@id="root"]/div/div[2]/div/div/table/tbody/tr/td[34]/div/div/p';
        this.sidebarGuestName = "//input[@id='full-name']";
        this.sidebarGuestEmail = "//input[@id='email']";
        this.sidebarGuestPhoneNumber = "//input[@id='contact-number']";
        this.checkInDateBox = "//input[@id='check-in']";
        this.checkOutDateBox = "//input[@id='check-out']";
        this.accommodationFee = "//input[@id='accommodation-fee']";
        this.createReservationButton = "//button[normalize-space()='Create Reservation']";
        this.viewdetailbutton = "//button[normalize-space()='View Details']";
    }

    async navigateToReservation() {

        await this.page.goto("https://test.propertystack-cdn.com/?importantOrgId=1685259606362x437519117363234200&token=bc5d679924fceda1f97778670739cc470c54&userId=1727751461519x198016365208826900");
        await this.page.waitForTimeout(30000);
        await this.page.click(this.nextmontharrow);
        await this.page.waitForTimeout(30000);
        await this.page.click(this.searchProperty);
        await this.page.fill(this.searchProperty, "Stunning Property");
        await this.page.waitForTimeout(30000);
        
        const dateCell = await this.page.$(this.todayDateData);
        const boundingBox = await dateCell.boundingBox();
        
        // Click in the center of the date cell
        await this.page.mouse.click(
            boundingBox.x + boundingBox.width / 2,
            boundingBox.y + boundingBox.height / 2
        );
        
        await this.page.pause();
        // Wait for the Add button to appear

        // await this.page.waitForSelector("//td[contains(@class, 'table-day-cell')]//div[contains(@class, 'add-options')]//p[contains(text(), '+ Add')]", { 
        //     state: 'visible', 
        //     timeout: 2000 
        // });
        // await this.page.click("//td[contains(@class, 'table-day-cell')]//div[contains(@class, 'add-options')]//p[contains(text(), '+ Add')]");
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),  // Wait for the new tab to open
            this.page.click(this.viewdetailbutton)  // This triggers the new tab
        ]);
        const newPageUrl = newPage.url();
        const match = newPageUrl.match(/reservations\/(\d+x\d+)/);


        if (match) {
            const dynamicId = match[1]; // Extracted dynamic number
            const newUrl = `https://mypropertystack.io/version-test/reservations/${dynamicId}`;
            
            // Open the new URL in the same browser
            await this.page.goto(newUrl);
        } else {
            console.error("Dynamic ID not found in the URL");
        }
        

    }

//     async editPositiveFlow(guest) {
//         // Click edit button
//         await this.page.waitForTimeout(10000);
//         await this.page.locator(this.editButton).click();
//         console.log("Landed on edit page");

//         // Fill guest count and select "Cancelled"
//         await this.page.locator(this.guestCountInput).fill(guest);
//         await this.page.locator(this.status).selectOption('Cancelled');
//         await this.page.locator(this.saveButton).click();
//         console.log("Saved with status: Cancelled");

//         // Click edit button again
//         await this.page.locator(this.editButton).click();
//         console.log("Landed on edit page again");

//         // Change status back to "Confirmed"
//         await this.page.locator(this.guestCountInput).fill(guest);
//         await this.page.locator(this.status).selectOption('confirmed');
//         await this.page.locator(this.saveButton).click();
//         console.log("Saved with status: Confirmed");
//     }
}

module.exports = EditResMC; 

