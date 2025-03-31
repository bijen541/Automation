const { test, expect } = require('@playwright/test');
const { ReservationDetailPage } = require('../pages/reservationdetail'); // Import Reservation Detail Page Class
const { login } = require('../pages/Loginpage'); // Import Login Function



test.beforeAll(async ({ page }) => {
        page = await browser.newPage();
        await login(page); // Perform login before the tests
        reservationDetailPage = new ReservationDetailPage(page);
        await page.goto('https://mypropertystack.io/version-test/reservations/1740538243569x883853172724876400'); // Navigate to reservation page
    });


test('Verify Summary Button Click and Check Fields', async ({ page }) => {
    const reservationDetailPage = new ReservationDetailPage(page);

    await reservationDetailPage.clickSummary();

    // Validate that the Summary section is visible
    expect(await reservationDetailPage.isSummaryVisible()).toBeTruthy();

    // Validate that fields are non-empty
    expect(await reservationDetailPage.getReferenceNumberText()).not.toBe('');
    expect(await reservationDetailPage.getDateBookedText()).not.toBe('');
    expect(await reservationDetailPage.getGuestCountText()).not.toBe('');
    expect(await reservationDetailPage.getPropertyListingText()).not.toBe('');
});

    

    test('Verify Guest Info Button Click', async () => {
        await reservationDetailPage.clickGuestInfo();
        const isVisible = await reservationDetailPage.isGuestInfoVisible();
        expect(isVisible).toBeTruthy();
    });

    test('Verify Payment Button Click', async () => {
        await reservationDetailPage.clickPayment();
        const isVisible = await reservationDetailPage.isPaymentVisible();
        expect(isVisible).toBeTruthy();
    });

    test('Verify Trust Button Click', async () => {
        await reservationDetailPage.clickTrust();
        const isVisible = await reservationDetailPage.isTrustVisible();
        expect(isVisible).toBeTruthy();
    });

    test('Verify Inbox Button Click', async () => {
        await reservationDetailPage.clickInbox();
        const isVisible = await reservationDetailPage.isInboxVisible();
        expect(isVisible).toBeTruthy();
    });

    test('Verify Reference Number', async () => {
        const referenceNumber = await reservationDetailPage.getReferenceNumberText();
        expect(referenceNumber).toBe('PSR10-27f3b');
    });

    test('Verify Date Booked', async () => {
        const dateBooked = await reservationDetailPage.getDateBookedText();
        expect(dateBooked).toBe('26 Feb, 2025');
    });

    test('Verify Guest Count', async () => {
        const guestCount = await reservationDetailPage.getGuestCountText();
        expect(guestCount).toBe('1');
    });

    test('Verify Property Listing Text', async () => {
        const propertyListing = await reservationDetailPage.getPropertyListingText();
        expect(propertyListing).toContain('3 Rosarii Pl, Goulburn NSW 2580, Australia');
    });

    test.afterAll(async () => {
        await page.close(); // Close the page after all tests
    });

