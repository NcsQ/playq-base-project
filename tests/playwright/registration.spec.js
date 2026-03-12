"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
// import {comm, web} from '@global';
// import { web, faker, comm, loc } from '@playq/core';
const core_1 = require("@playq/core");
const locNew = __importStar(require("../../resources/locators/lambdatest.loc"));
const locLt = locNew.lambdatest;
(0, test_1.test)('LambdaTest: Registration001', async ({ page }) => {
    test_1.test.info().annotations.push({ type: 'tag', description: 'smoke001' });
    await core_1.web.openBrowser(page, "#{env.lambdatest.registration.url}");
    await core_1.web.verifyPageTitle(page, "Register Account");
    await core_1.web.fill(page, "//input[@placeholder='First Name']", core_1.faker.custom.person.fullName());
    await core_1.web.fill(page, locLt.registerPage.inpt_lastName(page), "Doe");
    await core_1.web.fill(page, "loc.json.lambdatest.registerPage.inpt_telephone", "1234567890");
    // await web.fill(page,"First Name","John")
    // await web.fill(page,"Last Name","Doe")
    await core_1.web.fill(page, "E-Mail", core_1.faker.internet.email());
    // await web.fill(page,"Telephone","1234567890")
    // await web.fill(page,"Password","password123")
    // await web.fill(page,"Password Confirm","password123")
    // await web.clickRadioButton(page,"Yes")
    // await web.clickCheckbox(page,"I have read and agree to the Privacy Policy")
    // await web.clickButton(page,"Continue")
    // await web.verifyTextOnPage(page,"Your Account Has Been Created!")
    await core_1.comm.waitInMilliSeconds(5000);
});
test_1.test.describe('LambdaTest: Registration002 @REGRESSION', () => {
    (0, core_1.dataTest)('DEMO : LambdaTest Test Data Demo  Registration002', { file: "lambdaTest.csv", filter: "_STATUS == 'true'  && _ENV == 'DEV'", testType: "UI" }, async ({ row: td, page }) => {
        await core_1.web.openBrowser(page, "https://ecommerce-playground.lambdatest.io/index.php?route=account/register");
        await core_1.web.verifyPageTitle(page, "Register Account");
        await core_1.web.fill(page, "//input[@placeholder='First Name']", td.fName);
        await core_1.web.fill(page, locLt.registerPage.inpt_lastName(page), td.lName);
        await core_1.web.fill(page, "E-Mail", core_1.faker.internet.email());
        await core_1.comm.waitInMilliSeconds(5000);
    });
});
(0, test_1.test)('LambdaTest: Registration 2', async ({ page }) => {
    test_1.test.info().annotations.push({ type: 'tag', description: 'smoke' });
    await core_1.web.openBrowser(page, "https://ecommerce-playground.lambdatest.io/index.php?route=account/register");
    await core_1.web.verifyPageTitle(page, "Register Account");
    await core_1.web.fill(page, "First Name", "John");
    await core_1.web.fill(page, "Last Name", "Doe");
    await core_1.web.fill(page, "E-Mail", core_1.faker.internet.email());
    await core_1.web.fill(page, "Telephone", "1234567890");
    await core_1.web.fill(page, "Password", "password123");
    await core_1.web.fill(page, "Password Confirm", "password123");
    await core_1.web.clickRadioButton(page, "Yes");
    await core_1.web.clickCheckbox(page, "I have read and agree to the Privacy Policy");
    await core_1.web.clickButton(page, "Continue");
    await core_1.comm.waitInMilliSeconds(5000);
});
(0, test_1.test)('NTUC_OLD: UPortal Application ', async ({ page }) => {
    test_1.test.info().annotations.push({ type: 'tag', description: 'NTUC_OLD' }, { type: 'tag', description: 'smoke' });
    // await comm.comment("Starting NTUC Test #{pwd.grF0vaHW7fOHNdWaQyaIz4WczuVMKyZFpet92hd5FQaHDAbdmA}");
    console.log("Encrypt Password () ==> " + await core_1.comm.encryptPassword("password123"));
    // console.log("NAME  with () ==> " + utils.toCamelCase());
    console.log("NAME  with {withPrefix: true} ==> " + core_1.faker.custom.person.fullName({ withPrefix: true }));
    // 
    // console.log("NRIC ==> " + faker.custom.nric.generate());
    // console.log("NRIC Year==> " + faker.custom.nric.getYear(genNric)); // Example NRIC: S6348635C
    await core_1.web.openBrowser(page, "#{env.uportal.gb.url}");
    // await webActions.openBrowser(page,"https://uatportal.ntuc.org.sg/uportal/memberships/become-a-member")
    await core_1.web.verifyPageTitle(page, "NTUC Union Membership");
    await core_1.web.clickButton(page, "START APPLICATION");
    await core_1.web.clickButton(page, "APPLY MANUALLY");
    await core_1.web.verifyInputFieldPresent(page, "NRIC / FIN number");
    await core_1.web.fill(page, "NRIC / FIN number", core_1.faker.custom.nric.generate()); // Example NRIC for foreigner
    await core_1.web.fill(page, "Name as per NRIC / Passport", core_1.faker.custom.person.fullName());
    await core_1.web.fill(page, "Date of birth", core_1.faker.custom.person.birthDate({ min: 18, max: 65, format: 'DD-MM-YYYY' }));
    // Generate a random date of birth between 18 and 65 years ago
    await core_1.comm.waitInMilliSeconds(5000);
    //   await webActions.verifyPageTitle("Google")
    //   await webActions.waitInMilliSeconds(1000)
});
