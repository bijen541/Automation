const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/Loginpage');
const NewReservationPage = require('../pages/reservationpage'); 

test.beforeEach('Login before each test', async ({ page }) => {
    const loginPage = new LoginPage(page);


    await loginPage.login(
        'bijen@propertystack.ai',  // Username for login
        'Nepal@123',               // Password for login
        'bijen@propertystack.ai',  // Gmail username (for OTP retrieval)
        'khlofmsbttlhrvrb'         
    );
});


test('should create a new reservation', async ({ page }) => {
    const newReservationPage = new NewReservationPage(page);


    await newReservationPage.navigateToNewReservation(); 
    //await newReservationPage.selectCheckInDate(3, 2, 2025); // Selecting 3rd March 2025
    await newReservationPage.createNewReservation(
        'Bijen Automate',
        '1234567890',
        'automatetest@grr.la'
    );

    // Assertion: Verify reservation success message
    // const toasterMessage = page.locator('.toast-success');
    // await expect(toasterMessage).toBeVisible();
});


// test('should verify the reservation appears in the list', async ({ browser }) => {
//     const page = await browser.newPage();

//   
//     await page.click("//a[contains(text(), 'Reservations')]");

//   
//     const reservationEntry = page.locator("//td[contains(text(), 'Ocean View Villa')]");
//     await expect(reservationEntry).toBeVisible();
// });

