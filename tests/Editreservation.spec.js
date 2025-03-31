const { test, expect } = require('@playwright/test');
const EditResMC = require('../pages/editresmc'); 
const LoginPage = require('../pages/Loginpage');

test('Login before each test', async ({ page }) => {
    const loginPage = new LoginPage(page);


    await loginPage.login(
        'bijen@propertystack.ai',  // Username for login
        'Nepal@123',               // Password for login
        'bijen@propertystack.ai',  // Gmail username (for OTP retrieval)
        'khlofmsbttlhrvrb'         
    );
    const editResPage = new EditResMC(page);
    
    await editResPage.navigateToReservation();

});

