class ReservationDetailPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.summaryButton = "h3.bubble-element.Text.baTaXaNaW.clickable-element";
        this.guestInfoButton = "h3.bubble-element.Text.baTaXaNa.clickable-element";
        this.paymentButton = "h3.bubble-element.Text.baTaXaNb.clickable-element";
        this.trustButton = "h3.bubble-element.Text.baTaXaNh.clickable-element";
        this.inboxButton = "h3.bubble-element.Text.baTaXaNg.clickable-element";
        this.referenceNumber = "h3.bubble-element.Text.baTaXaQaP";
        this.dateBooked = "h3.bubble-element.Text.baTaXaRaW";
        this.guestCount = "h3.bubble-element.Text.baTaXaRj";
        this.propertyListing = "h3.bubble-element.Text.baTaXaRu";
    }

    async clickSummary() {
        await this.page.locator(this.summaryButton).click();
    }
    // Get text content
    async getReferenceNumberText() {
        return await this.page.locator(this.referenceNumber).textContent();
    }

    async getDateBookedText() {
        return await this.page.locator(this.dateBooked).textContent();
    }

    async getGuestCountText() {
        return await this.page.locator(this.guestCount).textContent();
    }

    async getPropertyListingText() {
        return await this.page.locator(this.propertyListing).textContent();
    }

    // Check visibility of elements
    async isSummaryVisible() {
        return await this.page.locator(this.summaryButton).isVisible();
    }

    async clickGuestInfo() {
        await this.page.locator(this.guestInfoButton).click();
    }

    async clickPayment() {
        await this.page.locator(this.paymentButton).click();
    }

    async clickTrust() {
        await this.page.locator(this.trustButton).click();
    }

    async clickInbox() {
        await this.page.locator(this.inboxButton).click();
    }

    
}

module.exports = { ReservationDetailPage };
