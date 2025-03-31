const { expect } = require('@playwright/test');
const { fetchOTP } = require('../pages/otphelper');  

class LoginPage {
    constructor(page) {
        this.page = page;
        this.userinput = '//input[@type="email"]';
        this.passwordinput = '//input[@type="password"]';
        this.loginbutton = '//button[contains(text(), "Authenticate")]';
        this.otpInput = "//input[@placeholder='Enter your code']"; 
        this.verifyButton = "//button[normalize-space()='Login']"; 
        this.dashboardURL = 'https://mypropertystack.io/version-test/my_work';
        this.newReservationURL = 'https://mypropertystack.io/version-test/new_reservation';
    }

    async login(username, password, gmailUser, gmailPassword) {
        await this.page.goto('https://mypropertystack.io/version-test/user-login');

        await this.page.fill(this.userinput, username);
        await this.page.fill(this.passwordinput, password);
        await this.page.click(this.loginbutton);

        // Fetch OTP from email
        try {
            const otp = await fetchOTP(gmailUser, gmailPassword);
            console.log('OTP received:', otp);

            // Enter OTP and verify
            await this.page.fill(this.otpInput, otp);
            await this.page.click(this.verifyButton);

            // Wait for successful login
            await this.page.waitForURL(this.dashboardURL, { timeout: 10000 });

            
            await expect(this.page).toHaveURL(this.dashboardURL);
            
            // await this.page.goto(this.newReservationURL);
            // await expect(this.page).toHaveURL(this.newReservationURL);
        } catch (error) {
            console.error('Error fetching OTP:', error);
        }
    }
}

module.exports = LoginPage;
