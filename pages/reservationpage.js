class NewReservationPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.checkInInput = "xpath=//div[@id='air1']//input";  // First input field
        this.checkOutInput = "xpath=//div[@id='air2']//input"; // Second input field
        this.propertydropdown = ".clickable-element.bubble-element.Group.baTvaDaU.bubble-r-container.flex.row";
        this.propertySearchInput = "#Search_Assigned_Properties";
        this.propertySelectLocator = ".bubble-element.group-item.bubble-r-container.flex.row.entry-1 .bubble-element.Shape.baTwgk";
        this.fullNameInput = "input[placeholder='Guest Name']";
        this.mobileInput = "input[name='phone'][type='tel']";
        this.emailInput = "input[placeholder='Enter Email']";
        this.createReservationButton = "button.bubble-element.Button.baTvaIc";
        this.successMessage = ".toast-success";
    }

    // Navigate to New Reservation Page
    async navigateToNewReservation() {
        console.log("Navigating to New Reservation page...");
        await this.page.goto("https://mypropertystack.io/version-test/new_reservation");
        console.log("Current URL:", await this.page.url());
        
        await this.page.waitForFunction(
            () => document.title === "New Reservation",
            { timeout: 60000 }
        );
    }

    // Create a New Reservation
    async createNewReservation(name, mobile, email) {
        // Click on the Check-In input field to open the calendar
        await this.page.pause();
        await this.page.locator(this.checkInInput).click();
        console.log("Clicked Check-In Input Field");
        await this.page.waitForTimeout(10000);
    
        await this.page.locator("//div[@class='air-datepicker-cell -day-' and @data-year='2025' and @data-month='1' and @data-date='14']").click(); // clicked on specific date
        await this.page.waitForTimeout(10000);
        console.log("Clicked Check-In specific date");
        
        // for checkout
        await this.page.locator(this.checkOutInput).click();
        await this.page.waitForTimeout(10000);
        console.log("Clicked Check-Out Input Field");
        
        // click on the locator of calendar
        await this.page.locator("/html/body/div[5]/div/div[2]/div/div[2]/div[15]").click(); // clicked on specific date
        await this.page.waitForTimeout(10000);
        console.log("Clicked Check-Out specific date");

        await this.page.locator(this.propertydropdown).click();
        await this.page.waitForTimeout(2000);

        console.log("Searching for property...");
        await this.page.waitForSelector(this.propertySearchInput, { timeout: 10000 });
        await this.page.locator(this.propertySearchInput).click();
        await this.page.locator(this.propertySearchInput).fill("Stunning Property");

        console.log("Waiting for results to load...");
        await this.page.waitForTimeout(2000);

        console.log("Selecting property...");
        await this.page.waitForSelector(this.propertySelectLocator, { state: "visible", timeout: 30000 });
        await this.page.locator(this.propertySelectLocator).first().click();
    
        console.log("Filling guest details...");
        await this.page.locator(this.fullNameInput).fill(name);
        await this.page.locator(this.mobileInput).click(); // Click to focus the input field
        console.log("Clicked Mobile Input");

        await this.page.locator(this.mobileInput).fill(mobile); // Fill mobile number
        console.log("Filled Mobile Number");
        await this.page.waitForTimeout(2000);

        await this.page.locator(this.emailInput).click(); // Click to focus the input field
        console.log("Clicked email Input");
        await this.page.locator(this.emailInput).fill(email);
        console.log("Filled Email");

        await this.page.waitForTimeout(2000);
        console.log("Completed Guest Details");

        console.log("Reservation successfully created!");
    }
}

module.exports = NewReservationPage;
