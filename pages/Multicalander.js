const { expect } = require('@playwright/test');

class Multicalander {
    constructor(page) {
        this.page = page;

        // Locators
        this.searchProperty = "//input[@placeholder='Search Property']";
        this.stunningProperty = "//div[contains(@class,'listing-container')]";
        this.nextmontharrow = "//img[@alt='right icon']"
        this.todayDateData = "//tbody/tr/td[11]/div[1]";
        this.channel = '//*[@id="radix-:rk1:-content-reservation"]/div[2]/div[2]/button';
        this.addReservationButton = '//*[@id="root"]/div/div[2]/div/div/table/tbody/tr/td[34]/div/div/p';
        this.sidebarGuestName = "//input[@id='full-name']";
        this.sidebarGuestEmail = "//input[@id='email']";
        this.sidebarGuestPhoneNumber = "//input[@id='contact-number']";
        this.checkInDateBox = "//input[@id='check-in']";
        this.checkOutDateBox = "//input[@id='check-out']";
        this.accommodationFee = "//input[@id='accommodation-fee']";
        this.createReservationButton = "//button[normalize-space()='Create Reservation']";
    
    }

    async navigateToMulticalendar() {
        console.log("Navigating to MultiCalendar page...");
        await this.page.goto("https://test.propertystack-cdn.com/?importantOrgId=1685259606362x437519117363234200&token=bc5d679924fceda1f97778670739cc470c54&userId=1727751461519x198016365208826900");
        // await this.page.waitForFunction(() => document.title === "MultiCalendar - Property Stack", { timeout: 60000 });
        // console.log("Page loaded successfully.");
        await this.page.click(this.nextmontharrow);
        await this.page.waitForTimeout(10000);
    }

    async createNewReservation(guestName, guestPhone, guestEmail) {
        console.log("Starting reservation process...");
        await this.page.click(this.searchProperty);
        await this.page.fill(this.searchProperty, "Stunning Property");
        
        await this.page.waitForSelector(this.stunningProperty, { timeout: 10000 });
        await this.page.waitForTimeout(2000);
        
        // Find the specific date cell you want
        const dateCell = await this.page.$(this.todayDateData);
        const boundingBox = await dateCell.boundingBox();
        
        // Click in the center of the date cell
        await this.page.mouse.click(
            boundingBox.x + boundingBox.width / 2,
            boundingBox.y + boundingBox.height / 2
        );
        
        // Wait for the Add button to appear
        await this.page.waitForSelector("//td[contains(@class, 'table-day-cell')]//div[contains(@class, 'add-options')]//p[contains(text(), '+ Add')]", { 
            state: 'visible', 
            timeout: 2000 
        });
        
        // Click on the Add button without moving the mouse
        await this.page.click("//td[contains(@class, 'table-day-cell')]//div[contains(@class, 'add-options')]//p[contains(text(), '+ Add')]");
        
        // Alternative approach if the above doesn't work
        /* 
        await this.page.evaluate(() => {
            // You might need to adjust the selectors to match your exact elements
            document.querySelector('td.table-day-cell').click();
            setTimeout(() => {
                document.querySelector('div.add-options p').click();
            }, 100);
        });
        */
        
        // Continue with the rest of reservation process
        await this.page.fill(this.sidebarGuestName, guestName);
        await this.page.fill(this.sidebarGuestEmail, guestEmail);
        await this.page.fill(this.sidebarGuestPhoneNumber, guestPhone);



        // Click on the check-in date box
        await this.page.click(this.checkInDateBox);
        await this.page.press(this.checkInDateBox, "ArrowLeft");
        await this.page.press(this.checkInDateBox, "ArrowLeft");
        await this.page.type(this.checkInDateBox, "04052025");
        console.log("Selected Check-in date.");
        
        await this.page.click(this.checkOutDateBox);
        await this.page.press(this.checkOutDateBox, "ArrowLeft");
        await this.page.press(this.checkOutDateBox, "ArrowLeft");
        await this.page.type(this.checkOutDateBox, "04062025");
        console.log("Selected Check-out date.");

        const channelButton = this.page.locator('[id^="radix-"][id$="-content-reservation"] >> button').first();
        await channelButton.click();
        await this.page.pause();
        
        await this.page.fill(this.accommodationFee, "200");
        await this.page.click(this.createReservationButton);
        console.log("Clicked on 'Create Reservation' button.");

    }
}

class BookingPage {
    constructor(page) {
        this.page = page;
        this.searchProperty = "//input[@placeholder='Search Property']";
        this.todayDateData = "//tbody/tr/td[9]/div[1]";
        this.addReservationButton = '//*[@id="root"]/div/div[2]/div/div/table/tbody/tr/td[34]/div/div/p';
        this.guestinfo= "//div[contains(@class, 'cursor-pointer')]/img[@alt='Guest Details']";
        this.guestname= "(//div[contains(@class, 'self-stretch') and contains(@class, 'text-sm') and contains(@class, 'font-semibold')])[1]";
        this.guestphone= "//img[@alt='phone icon']/parent::span";
        this.nextmontharrow = "//img[@alt='right icon']"
        this.guestemail ='//img[@alt="mail icon"]/parent::span';
        this.bookeddays = "(//img[@alt='calender icon'])[1]/parent::div/div";
        this.numberofguests = "//img[@alt='calender icon']/parent::div/following-sibling::div";
        this.channeldetail = "//img[@alt='calender icon']/parent::div/following-sibling::div/following-sibling::div";
    }
    async openGuestInfo() {
        await this.page.goto("https://test.propertystack-cdn.com/?importantOrgId=1685259606362x437519117363234200&token=bc5d679924fceda1f97778670739cc470c54&userId=1727751461519x198016365208826900");
        
        await this.page.click(this.nextmontharrow);
        await this.page.waitForTimeout(10000);
        await this.page.click(this.searchProperty);
        await this.page.fill(this.searchProperty, "Stunning Property");
        await this.page.waitForTimeout(3000);
        
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
        
        
    }

    async getGuestDetails() {
        await this.page.waitForTimeout(3000);
        const numberofdays = await this.page.locator(this.bookeddays).textContent();
        const numberogpeople = await this.page.locator(this.numberofguests).first().textContent();
        const selectedchannel = await this.page.locator(this.channeldetail).textContent();

        await this.page.locator(this.guestinfo).click();
        const name = await this.page.locator(this.guestname).textContent();
        const phone = await this.page.locator(this.guestphone).textContent();
        const email = await this.page.locator(this.guestemail).textContent();
        return { name: name.trim(), phone: phone.trim(), email: email.trim(),numberofdays: numberofdays.trim(), numberogpeople: numberogpeople.trim(), selectedchannel: selectedchannel.trim() };
}
}
module.exports = { Multicalander, BookingPage };
