"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsingMicrosoftSso = loginUsingMicrosoftSso;
exports.waitAndVerifyHeader = waitAndVerifyHeader;
exports.waitForNewTabToBePresent = waitForNewTabToBePresent;
exports.verifyFieldIsLocked = verifyFieldIsLocked;
exports.verifyFieldMandatory = verifyFieldMandatory;
exports.verifyFieldSecured = verifyFieldSecured;
exports.verifyInputValue = verifyInputValue;
exports.verifyLockedInputValue = verifyLockedInputValue;
exports.waiForLoaderToDisappear = waiForLoaderToDisappear;
exports.verifySelectFieldValue = verifySelectFieldValue;
exports.verifyInputLookupText = verifyInputLookupText;
exports.verifySelectListDoesNotHaveValue = verifySelectListDoesNotHaveValue;
exports.inputText = inputText;
exports.inputTextAndPressEnter = inputTextAndPressEnter;
exports.inputDate = inputDate;
exports.inputTime = inputTime;
exports.inputLookup = inputLookup;
exports.clickButton = clickButton;
exports.clickCloseWindow = clickCloseWindow;
exports.clickPopupButton = clickPopupButton;
exports.clickTabText = clickTabText;
exports.clickLinkWithText = clickLinkWithText;
exports.clickLookupRecordLink = clickLookupRecordLink;
exports.verifyText = verifyText;
exports.selectDropdown = selectDropdown;
exports.selectDropdownMultipleByText = selectDropdownMultipleByText;
exports.selectDropdownByIndex = selectDropdownByIndex;
exports.clickLeftMenu = clickLeftMenu;
exports.clickLeftMenuAndSubMenu = clickLeftMenuAndSubMenu;
exports.clickTopMenuButton = clickTopMenuButton;
exports.clickTopMenuButtonAndSubMenuButton = clickTopMenuButtonAndSubMenuButton;
exports.clickMainAndSubSystemView = clickMainAndSubSystemView;
exports.tableInputFilter = tableInputFilter;
exports.tableEditFilterDeleteAllAndInputNewFilters = tableEditFilterDeleteAllAndInputNewFilters;
exports.tableEditFilterResetToDefault = tableEditFilterResetToDefault;
exports.uploadFileAt = uploadFileAt;
exports.logoutFromDynamics = logoutFromDynamics;
exports.storeInputValueToVariable = storeInputValueToVariable;
exports.storeHeaderTitleToVariable = storeHeaderTitleToVariable;
const _playq_1 = require("@playq");
const { parseLooseJson, getValue, setValue } = _playq_1.vars;
const sessionUtil_1 = require("@src/helper/util/session/sessionUtil");
/**
 * D365CRM: Login using Microsoft SSO -sessionName: {param} -url: {param} -username: {param} -password: {param} -options: {param}
 *
 * Opens the specified URL in the provided Playwright Page instance, waits for the "Sign in" prompt,
 * fills in the username and password fields, and completes the sign-in process.
 * Throws an error if the D365 CRM addon is not enabled or the version is invalid.
 *
 * @param page - Playwright Page instance to perform actions on.
 * @param sessionName - The name of the session.
 * @param url - The URL of the D365 CRM login page.
 * @param username - The username (email) for Microsoft SSO login.
 * @param password - The password for Microsoft SSO login.
 * @param options - Optional string or object:
 *   - mfa: [boolean] Enable multi-factor authentication. Default: false.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function loginUsingMicrosoftSso(page, sessionName, url, username, password, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { mfa = false, screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    password = verifyAndWrap(password);
    username = verifyAndWrap(username);
    url = verifyAndWrap(url);
    if ((0, sessionUtil_1.isSessionValid)(sessionName)) {
        try {
            // Load session state into existing context
            // const browser = page.context().browser();
            await (0, sessionUtil_1.loadSessionIntoExistingContext)(page, sessionName);
            await _playq_1.web.waitForTextAtLocation(page, "Dynamics 365", "Dynamics 365", { pattern: "d365crm", actionTimeout: 60000 });
            await _playq_1.web.waitForTextAtLocation(page, "Home", "Home", { pattern: "d365crm", actionTimeout: 60000 });
            console.log('✅ Session loaded successfully');
        }
        catch (error) {
            console.warn('⚠️  Failed to load session, proceeding with fresh login:', error);
            await normalLogin();
        }
    }
    else {
        await normalLogin();
    }
    async function normalLogin() {
        await _playq_1.web.openBrowser(page, url);
        await _playq_1.web.waitForTextAtLocation(page, "Sign in", "Sign in", { pattern: "d365crm", actionTimeout: 10000 });
        await _playq_1.web.fill(page, "Email", username, { pattern: "d365crm", actionTimeout: 10000 });
        await _playq_1.web.clickButton(page, "Next", { pattern: "d365crm", actionTimeout: 10000 });
        await _playq_1.web.fill(page, "Password", password, { pattern: "d365crm", actionTimeout: 10000 });
        await _playq_1.web.clickButton(page, "Sign in", { pattern: "d365crm", actionTimeout: 10000 });
        if (mfa) {
            await _playq_1.web.clickLink(page, "use my Microsoft Authenticator app right now", { pattern: "d365crm", actionTimeout: 10000 });
            await _playq_1.web.clickLink(page, "Use a verification code", { pattern: "d365crm", actionTimeout: 10000 });
            await _playq_1.comm.generateTotpTokenToVariable("var.ms.totp");
            await _playq_1.web.fill(page, "Code", "#{var.ms.totp}", { pattern: "d365crm", actionTimeout: 10000 });
            await _playq_1.web.clickButton(page, "Verify", { pattern: "d365crm", actionTimeout: 10000 });
        }
        await _playq_1.web.waitForTextAtLocation(page, "Stay signed in?", "Stay signed in?", { pattern: "d365crm", actionTimeout: 10000 });
        await _playq_1.web.clickButton(page, "Yes", { pattern: "d365crm", actionTimeout: 10000 });
        await _playq_1.web.waitForTextAtLocation(page, "Dynamics 365", "Dynamics 365", { pattern: "d365crm", actionTimeout: 60000 });
        await _playq_1.web.waitForTextAtLocation(page, "Home", "Home", { pattern: "d365crm", actionTimeout: 60000 });
        try {
            // Save session with error handling
            await (0, sessionUtil_1.saveSessionSimplified)(page, sessionName);
            console.log('✅ Session saved successfully');
        }
        catch (error) {
            console.warn('⚠️  Failed to save session, continuing without session persistence:', error);
        }
    }
}
// =================================== VERIFY ===================================
/**
 * D365CRM: Wait and verify header -text: {param} -options: {param}
 *
 * Waits for the specified header text to appear on the page and verifies its presence.
 * Takes a screenshot if options are provided.
 *
 * @param page - Playwright Page instance to perform actions on.
 * @param header - The header text to wait for and verify.
 * @param options - Optional string or object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function waitAndVerifyHeader(page, header, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    await _playq_1.web.waitForHeader(page, header, header, { pattern: "d365crm", actionTimeout: 60000 });
    // await web.waitForTextAtLocation(page, header, header, { pattern: "d365crm", actionTimeout: 60000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Wait for new tab to be present -tab_text: {param} -options: {param}
 *
 * Waits for a new tab with the specified text to be present on the page.
 * Takes a screenshot if options are provided.
 *
 * @param page - Playwright Page instance to perform actions on.
 * @param tab_text - The text of the tab to wait for.
 * @param options - Optional string or object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function waitForNewTabToBePresent(page, tab_text, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    await _playq_1.web.waitForHeader(page, "{{tab}}", tab_text, { pattern: "d365crm", actionTimeout: 60000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Verify field is locked -field: {param} -options: {param}
 * Verifies that the specified field on the page is locked (read-only).
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the field.
 * @param options - Optional settings for the verification action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 *  - screenshotText: [string] Description for the screenshot.
 * - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 *
 */
async function verifyFieldIsLocked(page, field, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.verifyFieldIsLocked(page, field, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Verify field is mandatory -field: {param} -options: {param}
 * Verifies that the specified field on the page is mandatory.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the field.
 * @param options - Optional settings for the verification action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 *  - screenshotText: [string] Description for the screenshot.
 * - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function verifyFieldMandatory(page, field, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.verifyFieldIsMandatory(page, field, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Verify field is secured -field: {param} -options: {param}
 * Verifies that the specified field on the page is secured.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the field.
 * @param options - Optional settings for the verification action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 *  - screenshotText: [string] Description for the screenshot.
 * - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function verifyFieldSecured(page, field, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.verifyFieldIsSecured(page, field, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Verify input field value -field: {param} -value: {param} -options: {param}
 * Verifies that the value of an input field matches the expected value.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the field.
 * @param options - Optional settings for the verification action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 *  - screenshotText: [string] Description for the screenshot.
 * - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function verifyInputValue(page, field, text, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.verifyInputFieldValue(page, field, text, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Verify locked input field value -field: {param} -value: {param} -options: {param}
 * Verifies that the value of an locked input field matches the expected value.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the field.
 * @param options - Optional settings for the verification action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 *  - screenshotText: [string] Description for the screenshot.
 * - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function verifyLockedInputValue(page, field, text, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.verifyLockedInputFieldValue(page, field, text, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Wait for loader to disappear -field: {param} -options: {param}
 * Waits for the loader associated with the specified field to disappear from the page.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the field.
 * @param options - Optional settings for the wait action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 *  - screenshotText: [string] Description for the screenshot.
 * - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function waiForLoaderToDisappear(page, field, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.waitForDisplayed(page, field, { pattern: "d365crm", fieldType: "loader", actionTimeout: 10000 });
    await _playq_1.web.waitForDisappear(page, field, { pattern: "d365crm", fieldType: "loader", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Verify select field value -field: {param} -value: {param} -options: {param}
 * Verifies that the value of a select field matches the expected value.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, id, name, or selector of the select field to verify.
 * @param expectedValue - The expected value of the select field.
 * @param options - Optional settings for the verification action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 *  - screenshotText: [string] Description for the screenshot.
 *  - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function verifySelectFieldValue(page, field, expectedValue, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.verifySelectDropdownValue(page, field, expectedValue, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Verify input lookup text -field: {param} -value: {param} -options: {param}
 * Verifies that the value of an input lookup field matches the expected value.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the lookup field.
 * @param text - The expected lookup text value.
 * @param options - Optional settings for the verification action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 *  - screenshotText: [string] Description for the screenshot.
 * - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function verifyInputLookupText(page, field, text, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.verifyInputFieldValue(page, field, text, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Verify select list does not have given value -field: {param} -value: {param} -options: {param}
 * Verifies that the specified value does not exist in the select field's dropdown options.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the select field.
 * @param value - The value that should not be present in the dropdown options.
 * @param options - Optional settings for the verification action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 *  - screenshotText: [string] Description for the screenshot.
 *  - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function verifySelectListDoesNotHaveValue(page, field, value, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.verifySelectListNotHaveGivenValue(page, field, value, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 *
 */
// =================================== INPUT ===================================
/**
 * D365CRM: Input text into field -field: {param} -text: {param} -options: {param}
 *
 * Inputs the specified text into the given field on the page.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the field.
 * @param text - The text to input into the field.
 * @param options - Optional settings for the input action. Can be a JSON string or an object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function inputText(page, field, text, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.input(page, field, text, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Input Text with Enter key -fieldName: {param} -text: {param} -options: {param}
 *
 * Inputs the specified text into the given field on the page.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the field.
 * @param text - The text to input into the field.
 * @param options - Optional settings for the input action. Can be a JSON string or an object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function inputTextAndPressEnter(page, field, text, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.input(page, field, text, { pattern: "d365crm", actionTimeout: 10000 });
    await _playq_1.web.pressKey(page, "Enter");
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/** * D365CRM: Input date into field -field: {param} -date: {param} -options: {param}
 * Inputs the specified date into the given field on the page.
 * Designed for use in Cucumber step definitions.
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the field.
 * @param date - The date to input into the field.
 * @param options - Optional settings for the input action. Can be a JSON string or an object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function inputDate(page, field, date, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.input(page, field, date, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Input time into field -field: {param} -time: {param} -options: {param}
 *
 * Inputs the specified time into the given field on the page.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the field.
 * @param time - The time to input into the field.
 * @param options - Optional settings for the input action. Can be a JSON string or an object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function inputTime(page, field, time, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.input(page, field, time, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Input lookup -field: {param} -text: {param} -options: {param}
 * Inputs the specified lookup text into the given field on the page.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the field.
 * @param text - The lookup text to input into the field.
 * @param options - Optional settings for the input action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 *  - screenshotText: [string] Description for the screenshot.
 *  - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 * - inputLookupText: [string] Special instructions for inputting lookup text. Default: "".
 *
 * for e.g:
 * D365CRM: Input lookup -field: "Nationality" -text: "SINGAPORE CITIZEN" -options: "{inputLookupText: 'By-Clearing-Value'}"
 * D365CRM: Input lookup -field: "Nationality" -text: "SINGAPORE CITIZEN" -options: ""
 */
async function inputLookup(page, field, text, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, inputLookupText = "", } = options_json !== null && options_json !== void 0 ? options_json : {};
    let field1 = "{{main}} " + field;
    let field2 = "{{dropdown_list}} " + text;
    let clearValueField = "{{main}} " + field.toLowerCase();
    await _playq_1.web.clickButton(page, field1, { pattern: "d365crm", actionTimeout: 10000 });
    if (inputLookupText == "By-Clearing-Value") {
        await _playq_1.web.clickButton(page, clearValueField, { pattern: "d365crm", actionTimeout: 10000 });
        await _playq_1.comm.waitInMilliSeconds(2000);
    }
    await _playq_1.web.input(page, field1, text, { pattern: "d365crm", actionTimeout: 10000 });
    await _playq_1.comm.waitInMilliSeconds(2000);
    await _playq_1.web.clickLink(page, field2, { pattern: "d365crm", actionTimeout: 10000 });
}
// =================================== CLICK ===================================
/**
 * D365CRM: Click button -field: {param} -options: {param}
 *
 * Clicks a button on the page using the specified field name and options.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param field — The label, text, id, name, or selector of the button to click (e.g., "Submit", "Save", "Cancel").
 * @param options - Optional settings for the click action. Can be a JSON string or an object.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function clickButton(page, field, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.clickButton(page, field, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Click close window -options: {param}
 *
 * Clicks the close button on the window.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param options - Optional settings for the click action. Can be a JSON string or an object.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function clickCloseWindow(page, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    await _playq_1.web.clickButton(page, "{{main}} Close", { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Click popup button -text: {param} -options: {param}
 *
 * Clicks a button in a popup window using the specified button text and options.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param buttonText - The text, label, id, name, or selector of the button to click (e.g., "OK", "Cancel").
 * @param options - Optional settings for the click action. Can be a JSON string or an object.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function clickPopupButton(page, buttonText, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    buttonText = "{{popup_dialog}} " + buttonText;
    await _playq_1.web.clickButton(page, buttonText, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Click tab -tabText: {param} -options: {param}
 * Clicks a tab with the specified text and options.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param tabText - The text of the tab to click (e.g., "Home", "Settings").
 * @param options - Optional settings for the click action. Can be a JSON string or an object.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function clickTabText(page, tabText, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    let field = "{{tab}} " + tabText;
    let moreTabsField = "{{tab}} " + "More Tabs";
    let dropDownTabField = "{{dropdown_tab}} " + tabText;
    let relatedTabField = "{{tab}} " + "Related";
    //Add  override actionTimeout to wait for tab to be visible
    if (await verifyTabFieldIsDisplayed(page, field, { pattern: "d365crm", actionTimeout: 10000 })) {
        await _playq_1.web.clickTab(page, field, { pattern: "d365crm", actionTimeout: 10000 });
    }
    else if (await verifyTabFieldIsDisplayed(page, moreTabsField, { pattern: "d365crm", actionTimeout: 10000 })) {
        await _playq_1.web.clickTab(page, moreTabsField, { pattern: "d365crm", actionTimeout: 10000 });
        await _playq_1.comm.waitInMilliSeconds(2000);
        await _playq_1.web.clickLink(page, dropDownTabField, { pattern: "d365crm", actionTimeout: 10000 });
    }
    else {
        await _playq_1.web.clickTab(page, relatedTabField, { pattern: "d365crm", actionTimeout: 10000 });
        await _playq_1.comm.waitInMilliSeconds(2000);
        await _playq_1.web.clickLink(page, dropDownTabField, { pattern: "d365crm", actionTimeout: 10000 });
    }
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
    async function verifyTabFieldIsDisplayed(page, field, options) {
        const options_json = typeof options === "string" ? parseLooseJson(options) : options || {};
        const { actionactionTimeout = Number(_playq_1.vars.getConfigValue("testExecution.actionactionTimeout")) || 30000, pattern, } = options_json;
        if (!page)
            throw new Error("Page not initialized");
        await _playq_1.web.waitForPageToLoad(page);
        const target = typeof field === "string"
            ? await (0, _playq_1.webLocResolver)("tab", field, page, pattern, actionactionTimeout)
            : field;
        try {
            await _playq_1.web.waitForEnabled(target, actionactionTimeout);
            const isVisible = await target.isVisible();
            return isVisible;
        }
        catch (_a) {
            return false;
        }
    }
}
/**
 * D365CRM: Click link with text -text: {param} -options: {param}
 *
 * Clicks a link with the specified text and options.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param linkText - The text of the link to click (e.g., "Home", "Login").
 * @param options - Optional settings for the click action. Can be a JSON string or an object.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function clickLinkWithText(page, linkText, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    linkText = "{{main}} " + linkText;
    await _playq_1.web.clickLink(page, linkText, { pattern: "d365crm", actionTimeout: 60000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Click lookup record link -field: {param} -options: {param}
 *
 * Clicks a link for a lookup record using the specified field name and options.
 * Throws an error if the D365 CRM addon is not enabled or the version is invalid.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param field - The label, text, id, name, or selector of the link to click (e.g., "Account", "Contact").
 * @param options - Optional settings for the click action. Can be a JSON string or an object.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function clickLookupRecordLink(page, field, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field + ", Lookup";
    await _playq_1.web.clickLink(page, field, { pattern: "d365crm", actionTimeout: 60000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
// =================================== VERIFY ===================================
/**
 * D365CRM: Verify text -text: {param} -options: {param}
 *
 * Verifies that the specified text is present and visible on the page.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param text - The text to verify on the page (e.g., "Welcome", "Success", "Error message").
 * @param options - Optional settings for the verification action. Can be a JSON string or an object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 *   - actionTimeout: [number] actionTimeout in milliseconds. Default: 30000.
 *   - partialMatch: [boolean] If true, allows partial text matching. Default: false.
 *   - ignoreCase: [boolean] If true, case-insensitive matching. Default: true.
 */
async function verifyText(page, text, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, actionTimeout = 30000, partialMatch = false, ignoreCase = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    const field = "{{main}} " + text;
    await _playq_1.web.waitForTextAtLocation(page, field, text, {
        pattern: "d365crm",
        actionTimeout,
        partialMatch,
        ignoreCase
    });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
// =================================== SELECT ===================================
/**
 * D365CRM: Select -text: {param} -field: {param} -options: {param}
 *
 * Selects the specified option text from a dropdown/select field on the page.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param text - The option text to select from the dropdown (e.g., "Active", "Inactive", "Draft").
 * @param field - The label, text, id, name, or selector of the select field.
 * @param options - Optional settings for the select action. Can be a JSON string or an object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 *   - actionTimeout: [number] actionTimeout in milliseconds. Default: 30000.
 */
async function selectDropdown(page, field, text, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, actionTimeout = 30000, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.selectDropdown(page, field, text, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Select multiple -text: {param} -field: {param} -options: {param}
 *
 * Selects multiple option texts from a dropdown/select field on the page.
 * Designed for use in Cucumber step definitions.
 *
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the select field.
 * @param text - The option texts to select from the dropdown, separated by commas (e.g., "Option1, Option2, Option3").
 * @param options - Optional settings for the select action. Can be a JSON string or an object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 *   - actionTimeout: [number] actionTimeout in milliseconds. Default: 30000.
 */
async function selectDropdownMultipleByText(page, field, text, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, actionTimeout = 30000, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    let dropdownText = text.split(",");
    for (let i = 0; i < dropdownText.length; i++) {
        let resolvedText = dropdownText[i].trim();
        await _playq_1.web.selectDropdown(page, field, resolvedText, { pattern: "d365crm", actionTimeout });
    }
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Select by index -field: {param} -index: {param} -options: {param}
 *
 * Selects an option from a dropdown/select field on the page by its index.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the select field.
 * @param index - The index of the option to select from the dropdown (0-based).
 * @param options - Optional settings for the select action. Can be a JSON string or an object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 *   - actionTimeout: [number] actionTimeout in milliseconds. Default: 30000.
 */
async function selectDropdownByIndex(page, field, index, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, actionTimeout = 30000, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.selectDropdownByIndex(page, field, index, { pattern: "d365crm", actionTimeout });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Click left menu -text: {param} -options: {param}
 *
 * Prepends "{{nav_left}} " to the provided link text, then attempts to click the corresponding link
 * using a pattern specific to D365 CRM. Optionally takes a screenshot after clicking.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param menuText - The text, label, id, name, or selector of the link to click (e.g., "Home", "Login", "Forgot Password").
 * @param options - Optional settings for the click and screenshot actions. Can be a JSON string or an object.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function clickLeftMenu(page, menuText, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    menuText = "{{nav_left}} " + menuText;
    await _playq_1.web.clickLink(page, menuText, { pattern: "d365crm", actionTimeout: 60000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Click left menu -text:{param} then sub menu -text:{string} -options: {param}
 *
 * This function first ensures the D365 addon is available, then clicks the main menu item,
 * waits for the sub menu item to appear, and clicks it. Optionally, it can take a screenshot
 * after performing the actions.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param mainMenuText - The text, label, id, name, or selector of the main menu item to click (e.g., "Home", "Login").
 * @param subMenuText - The text, label, id, name, or selector of the sub menu item to click (e.g., "Settings", "Profile").
 * @param options - Optional settings for the action. Can be a JSON string or an object.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function clickLeftMenuAndSubMenu(page, mainMenuText, subMenuText, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    mainMenuText = "{{nav_left}} " + mainMenuText;
    await _playq_1.web.clickLink(page, mainMenuText, { pattern: "d365crm", actionTimeout: 60000 });
    await _playq_1.web.waitForTextAtLocation(page, subMenuText, subMenuText, { pattern: "d365crm", actionTimeout: 10000 });
    await _playq_1.web.clickLink(page, subMenuText, { pattern: "d365crm", actionTimeout: 60000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Click top menu button -text: {param} -options: {param}
 *
 * Prepends "{{main}} " to the provided button text, then attempts to click the corresponding button
 * using a pattern specific to D365 CRM. Optionally takes a screenshot after clicking.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param buttonText - The text, label, id, name, or selector of the button to click (e.g., "Save", "Cancel").
 * @param options - Optional settings for the click and screenshot actions. Can be a JSON string or an object.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function clickTopMenuButton(page, buttonText, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    buttonText = "{{main}} " + buttonText;
    await _playq_1.web.clickButton(page, buttonText, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Click top menu button -text: {param} then sub menu -text:{string} -options: {param}
 *
 * This function first ensures the D365 addon is available, then clicks the main menu button,
 * waits for the sub menu button to appear, and clicks it. Optionally, it can take a screenshot
 * after performing the actions.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param mainButtonText - The text, label, id, name, or selector of the main button to click (e.g., "Save", "Cancel").
 * @param subButtonText - The text, label, id, name, or selector of the sub button to click (e.g., "Settings", "Profile").
 * @param options - Optional settings for the action. Can be a JSON string or an object.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function clickTopMenuButtonAndSubMenuButton(page, mainButtonText, subButtonText, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    mainButtonText = "{{main}} " + mainButtonText;
    subButtonText = "{{dropdown_menu}} " + subButtonText;
    await _playq_1.web.clickButton(page, mainButtonText, { pattern: "d365crm", actionTimeout: 10000 });
    await _playq_1.web.clickLink(page, subButtonText, { pattern: "d365crm", actionTimeout: 60000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Click main system view -text:{param} then sub system view -text:{param} -options: {param}
 *
 * This function first ensures the D365 addon is available, then clicks the main system view,
 * waits for the sub system view to appear, and clicks it. Optionally, it can take a screenshot
 * after performing the actions.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param mainViewText - The text, label, id, name, or selector of the main view to click (e.g., "Save", "Cancel").
 * @param subViewText - The text, label, id, name, or selector of the sub view to click (e.g., "Settings", "Profile").
 * @param options - Optional settings for the action. Can be a JSON string or an object.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function clickMainAndSubSystemView(page, mainViewText, subViewText, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    mainViewText = "{{main}} " + mainViewText;
    subViewText = "{{dropdown_system_view}} " + subViewText;
    await _playq_1.web.waitForTextAtLocation(page, mainViewText, mainViewText, { pattern: "d365crm", actionTimeout: 10000 });
    await _playq_1.web.clickLink(page, mainViewText, { pattern: "d365crm", actionTimeout: 60000 });
    await _playq_1.web.waitForTextAtLocation(page, subViewText, subViewText, { pattern: "d365crm", actionTimeout: 10000 });
    await _playq_1.web.clickLink(page, subViewText, { pattern: "d365crm", actionTimeout: 60000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
// =================================== TABLE / GRID ===================================
/**
 * D365CRM: Table input filter -field: {param} -text: {param} -options: {param}
 *
 * Inputs the specified text into a table filter field and applies the filter.
 * Designed for use in Cucumber step definitions.
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the filter field.
 * @param text - The text to input into the filter field.
 * @param options - Optional settings for the action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 * - screenshotText: [string] Description for the screenshot.
 * - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function tableInputFilter(page, field, text, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.input(page, field, text, { pattern: "d365crm", actionTimeout: 10000 });
    await _playq_1.web.pressKey(page, "Enter");
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Table edit filter delete all and input new filters -filters: {param} -options: {param}
 * Deletes all existing filters in the table edit filter dialog and inputs new filters based on the provided filter string.
 * Designed for use in Cucumber step definitions.
 * @param page - Playwright Page instance.
 * @param filters - A string representing the filters to input, formatted as "[['Field1','Operator1','Value1'],['Field2','Operator2','Value2']]".
 * @param options - Optional settings for the action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 * - screenshotText: [string] Description for the screenshot.
 * - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
  * for e.g:
  * D365CRM: Table edit filter delete all and input new filters -filters: "[['Status','Equals','Active'],['Priority','Equals','High']]" -options: ""
  * D365CRM: Table edit filter delete all and input new filters -filters: "[['Created On','On or After','2023-01-01'],['Owner','Equals','John Doe']]" -options: "{screenshot: false}"
 */
async function tableEditFilterDeleteAllAndInputNewFilters(page, filters, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    await _playq_1.web.clickButton(page, "{{main}} open-advanced-filter", { pattern: "d365crm", actionTimeout: 10000 });
    await _playq_1.comm.waitInMilliSeconds(2000);
    await _playq_1.web.clickButton(page, "{{table_edit_filter}} Delete all filters", { pattern: "d365crm", actionTimeout: 10000 });
    // This split will NOT work correctly for the string:
    // ['Application Status','Contains','IN-PROGRESS'],['Marital Status','Equals','MARRIED']
    // Because filters.split("],\\[") will not split as expected due to escaping and the format.
    // Instead, use a regex to split at "],[" (with optional whitespace):
    let filterArray = filters.split(/\],\s*\[/);
    let filterCount = 0;
    for (const filter of filterArray) {
        filterCount = filterCount + 1;
        await _playq_1.web.clickButton(page, "{{table_edit_filter}} Add", { pattern: "d365crm", actionTimeout: 10000 });
        await _playq_1.web.clickButton(page, "{{dropdown_table_edit_filter_menu}} Add row", { pattern: "d365crm", actionTimeout: 10000 });
        let counter = 0;
        // Parse each filter row, e.g. ["Field","Operator","Value"]
        let rowFilters = filter.replace(/\[/g, "").replace(/\]/g, "").split("','");
        for (let singleFilter of rowFilters) {
            counter = counter + 1;
            singleFilter = singleFilter.replace(/'/g, "").trim();
            if (counter === 1) {
                // Click field selector
                await _playq_1.web.waitForDisplayed(page, `{{table_edit_filter}} field selector[${filterCount}]`, { pattern: "d365crm", fieldType: "button", actionTimeout: 10000 });
                await _playq_1.web.clickButton(page, `{{table_edit_filter}} field selector[${filterCount}]`, { pattern: "d365crm", actionTimeout: 10000 });
                await _playq_1.web.waitForDisplayed(page, `{{dropdown_table_edit_filter_menu}} ${singleFilter}`, { pattern: "d365crm", fieldType: "button", actionTimeout: 10000 });
                await _playq_1.web.clickButton(page, `{{dropdown_table_edit_filter_menu}} ${singleFilter}`, { pattern: "d365crm", actionTimeout: 10000 });
            }
            else if (counter === 2) {
                if (singleFilter.length > 0) {
                    // Click operator selector
                    await _playq_1.web.waitForDisplayed(page, `{{table_edit_filter}} Operator[${filterCount}]`, { pattern: "d365crm", fieldType: "button", actionTimeout: 10000 });
                    await _playq_1.web.clickButton(page, `{{table_edit_filter}} Operator[${filterCount}]`, { pattern: "d365crm", actionTimeout: 10000 });
                    await _playq_1.web.waitForDisplayed(page, `{{dropdown_table_edit_filter_menu}} ${singleFilter}`, { pattern: "d365crm", fieldType: "button", actionTimeout: 10000 });
                    await _playq_1.web.clickButton(page, `{{dropdown_table_edit_filter_menu}} ${singleFilter}`, { pattern: "d365crm", actionTimeout: 10000 });
                }
            }
            else if (counter === 3) {
                if (singleFilter.length > 0) {
                    // Handle value(s)
                    let valueFilters = singleFilter.split(",");
                    for (const valFilterRaw of valueFilters) {
                        const valFilter = valFilterRaw.replace(/'/g, "").trim();
                        await _playq_1.web.clickButton(page, `{{table_edit_filter}} Value[${filterCount}]`, { pattern: "d365crm", actionTimeout: 10000 });
                        // Try to select from dropdown, else input directly
                        const dropdownSelector = `{{dropdown_table_edit_filter_menu}} ${valFilter}`;
                        try {
                            await _playq_1.web.waitForDisplayed(page, dropdownSelector, { pattern: "d365crm", fieldType: "button", actionTimeout: 2000 });
                            await _playq_1.web.clickButton(page, dropdownSelector, { pattern: "d365crm", actionTimeout: 2000 });
                        }
                        catch (_a) {
                            await _playq_1.web.input(page, `{{table_edit_filter}} Value[${filterCount}]`, valFilter, { pattern: "d365crm", actionTimeout: 10000 });
                        }
                    }
                }
            }
        }
    }
    await _playq_1.web.waitForDisplayed(page, "{{table_edit_filter}} Apply", { pattern: "d365crm", fieldType: "button", actionTimeout: 10000 });
    await _playq_1.web.clickButton(page, "{{table_edit_filter}} Apply", { pattern: "d365crm", actionTimeout: 10000 });
}
/**
 * D365CRM: Table edit filter reset to default -options: {param}
 *
 * Resets the table edit filter to its default state.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param options - Optional settings for the action. Can be a JSON string or an object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function tableEditFilterResetToDefault(page, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    await _playq_1.web.clickButton(page, "{{main}} open-advanced-filter", { pattern: "d365crm", actionTimeout: 10000 });
    await _playq_1.comm.waitInMilliSeconds(2000);
    await _playq_1.web.clickButton(page, "{{table_edit_filter}} Reset to default", { pattern: "d365crm", actionTimeout: 10000 });
    await _playq_1.web.waitForDisplayed(page, "{{table_edit_filter}} Apply", { pattern: "d365crm", fieldType: "button", actionTimeout: 10000 });
    await _playq_1.web.clickButton(page, "{{table_edit_filter}} Apply", { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Upload file at -field: {param} with filename: {param} -options: {param}
 *
 * Uploads a file by interacting with a file input or a button that opens the file chooser.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the target upload control.
 * @param filename - Path to the file to upload. Relative paths are resolved by Playwright from CWD.
 * @param options - Optional settings for the action. Can be a JSON string or an object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 *   - actionTimeout: [number] actionTimeout in milliseconds. Default: 30000.
 */
async function uploadFileAt(page, field, filename, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, actionTimeout = 30000, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.uploadFile(page, field, filename, { pattern: "d365crm", actionTimeout });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Logout from Dynamics -options: {param}
 *
 * Logs out from the Dynamics 365 CRM application.
 * @param page - Playwright Page instance.
 * @param options - Optional settings for the logout action. Can be a JSON string or an object:
 *  - screenshot: [boolean] Capture a screenshot. Default: true.
 *  - screenshotText: [string] Description for the screenshot.
 *  - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 *
 */
async function logoutFromDynamics(page, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { screenshot = true, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    await _playq_1.web.clickButton(page, "headerPicture", { pattern: "d365crm", actionTimeout: 10000 });
    await _playq_1.web.clickButton(page, "Sign out of this account", { pattern: "d365crm", actionTimeout: 10000 });
    await _playq_1.web.waitForTextAtLocation(page, 'Pick an account', 'Pick an account', { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Store input value in variable -field: {param} -variableName: {param} -options: {param}
 *
 * Retrieves the value from the specified input field and stores it in a variable.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the input field.
 * @param variableName - The name of the variable to store the value in.
 * @param options - Optional settings for the action. Can be a JSON string or an object:
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function storeInputValueToVariable(page, field, variableName, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { pattern, screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.storeElementTextInVariable(page, field, variableName, { pattern: "d365crm", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
/**
 * D365CRM: Store header title in form page to variable -field: {param} -variableName: {param} -options: {param}
 *
 * Retrieves the value from the specified header field and stores it in a variable.
 * Designed for use in Cucumber step definitions.
 *
 * @param page - Playwright Page instance.
 * @param field - The label, text, id, name, or selector of the header field.
 * @param variableName - The name of the variable to store the value in.
 * @param options - Optional settings for the action. Can be a JSON string or an object:
 *  - pattern: [string] The pattern to use for locating the element.
 *  - fieldType: [string] The type of the field (e.g., "text", "value").
 *  - attribute: [string] The attribute to retrieve the value from (e.g., "innerText", "value").
 *  - trim: [boolean] Whether to trim whitespace from the value. Default: true.
 *  - normalizeWhitespace: [boolean] Whether to normalize whitespace in the value. Default: true.
 *   - screenshot: [boolean] Capture a screenshot. Default: true.
 *   - screenshotText: [string] Description for the screenshot.
 *   - screenshotFullPage: [boolean] Capture full page screenshot. Default: true.
 */
async function storeHeaderTitleToVariable(page, field, variableName, options) {
    checkD365Addon();
    const options_json = typeof options === "string" ? _playq_1.vars.parseLooseJson(options) : options || {};
    const { pattern, screenshot = false, screenshotText = "", screenshotFullPage = true, } = options_json !== null && options_json !== void 0 ? options_json : {};
    field = "{{main}} " + field;
    await _playq_1.web.storeElementTextInVariable(page, field, variableName, { pattern: "d365crm", fieldType: "header", attribute: "title", actionTimeout: 10000 });
    if (screenshot)
        await _playq_1.web.takeScreenshot(page, options);
}
function verifyAndWrap(text) {
    // Replace any pwd.<text> or enc.<text> not already wrapped with #{...}
    return text.replace(/(?<!#\{)(pwd\.|enc\.)[a-zA-Z0-9_.-]+/g, (match) => `#{${match}}`);
}
function checkD365Addon() {
    console.log("=====> ", _playq_1.vars.getValue('config.addons.d365Crm.enable'));
    const d365CrmEnable = _playq_1.vars.getConfigValue('addons.d365Crm.enable').toLowerCase().trim() === 'true';
    const d365CrmVersion = _playq_1.vars.getConfigValue('addons.d365Crm.version').toLowerCase().trim();
    if (!d365CrmEnable || !d365CrmVersion.startsWith("v")) {
        throw new Error("❌ D365 CRM addon is not enabled or version is invalid");
    }
}
