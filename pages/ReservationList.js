class Reservationlist{
    constructor(page){
        this.page = new page
    }
    async navigatetoReservationlist() {
        console.log("Navigating to New Reservation page...");
        await this.page.goto("https://mypropertystack.io/version-test/reservations_list");
        console.log("Current URL:", await this.page.url());
    }
    async createdreservation(){
        console.log("Navigating to the 'new' tab");
        await page.locator("//h3[contains(text(), 'New')]").click();


    }
}        