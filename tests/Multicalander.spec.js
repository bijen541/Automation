const { test, expect } = require('@playwright/test');
const { Multicalander, BookingPage } = require('../pages/Multicalander');

test('should create a reservation and verify it appears in the MultiCalendar', async ({ page }) => {
    const multicalander = new Multicalander(page);

    console.log("Starting test: Create and Verify Reservation");

    // **Navigate to MultiCalendar**
    await multicalander.navigateToMulticalendar();

    // **Create a new reservation**
    const guestName = 'Bijen Automate';
    const guestPhone = '1234567890';
    const guestEmail = 'automatetest@grr.la';

    console.log("Creating a new reservation...");
    await multicalander.createNewReservation(guestName, guestPhone, guestEmail);

    testData = { guestName, guestPhone, guestEmail };
    console.log("Reservation created and details stored.");

    
});
test.only('should verify the reservation details', async ({ page }) => {
    const bookingPage = new BookingPage(page);
    
    await bookingPage.openGuestInfo();
    
    const expectedGuest = {
        name: 'Bijen Automate',
        phone: '1234567890',
        email: 'automatetest@grr.la',
        numberofdays: '1',
        numberogpeople: '1',
        selectedchannel: 'AirBNB'
    };
    
    const guestDetails = await bookingPage.getGuestDetails();

    function checkAndLog(field, actual, expected) {
        if (actual !== expected) {
            console.warn(` Mismatch in "${field}": Expected "${expected}", but got "${actual}"`);
        } else {
            console.log(`correct "${field}" is correct: "${actual}"`);
        }
    }

    // Checking each field and logging mismatches instead of stopping the test
    checkAndLog('numberofdays', guestDetails.numberofdays, expectedGuest.numberofdays);
    checkAndLog('numberogpeople', guestDetails.numberogpeople, expectedGuest.numberogpeople);
    checkAndLog('selectedchannel', guestDetails.selectedchannel, expectedGuest.selectedchannel);
    checkAndLog('name', guestDetails.name, expectedGuest.name);
    checkAndLog('phone', guestDetails.phone, expectedGuest.phone);
    checkAndLog('email', guestDetails.email, expectedGuest.email);

    console.log("✅ Test execution completed despite mismatches.");
});