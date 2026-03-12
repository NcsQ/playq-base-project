"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patternIq = patternIq;
const core_1 = require("@playq/core");
const LABEL_ELIGIBLE_TAGS = new Set(['input', 'select', 'textarea']);
// Global variables (adjust as needed)
let locType = "";
let locField = "";
let locFieldName = "";
let locFieldInstance = "";
let locFieldForId = "";
let locSection = "";
let locSectionName = "";
let locSectionValue = "";
let locLocation = "";
let locLocationName = "";
let locLocationValue = "";
let patternVarNameField = "";
let patternVarNameLocation = "";
let patternVarNameSection = "";
let patternVarNameSroll = "";
/**
 * Helper function to query a chain locator.
 * If the locator contains ">>", it splits the string into parts and queries sequentially.
 */
function queryChain(context, chainLocator) {
    const parts = chainLocator.split(">>").map(part => part.trim());
    let currentContext = context;
    for (const part of parts) {
        if (!currentContext)
            return null;
        let element = null;
        // If the part is XPath, evaluate using document.evaluate.
        if (part.startsWith("//") || part.startsWith("(")) {
            const res = document.evaluate(part, currentContext, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            element = res.singleNodeValue;
        }
        else {
            // Otherwise, treat as a CSS selector.
            element = currentContext.querySelector(part);
            // If not found and current context is an Element with shadow DOM, try its shadowRoot.
            if (!element && currentContext instanceof Element && currentContext.shadowRoot) {
                element = currentContext.shadowRoot.querySelector(part);
            }
        }
        if (!element)
            return null;
        currentContext = element;
    }
    // Ensure the final context is an Element before returning.
    if (currentContext instanceof Element) {
        return currentContext;
    }
    return null;
}
/**
 * Helper function to query an element.
 * If the selector contains ">>", it delegates to queryChain.
 */
function queryElement(context, selector) {
    selector = selector.trim();
    if (selector.includes(">>")) {
        return queryChain(context, selector);
    }
    if (selector.startsWith("//") || selector.startsWith("(")) {
        const res = document.evaluate(selector, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return res.singleNodeValue;
    }
    else {
        return context.querySelector(selector);
    }
}
/**
 * Evaluates the chained locator on the page.
 * It applies locationLocator (if provided), then sectionLocator (if provided),
 * then the fieldLocator. If fieldLocator contains a chain (using ">>"),
 * queryChain is used.
 */
async function evaluateChainedLocator(page, locationLocator, sectionLocator, fieldLocator, isLabelCheck) {
    // Wait for the page to load completely.
    // const page = webFixture.getCurrentPage();
    try {
        await page.waitForLoadState("load", { timeout: 5000 });
    }
    catch (e) {
        // Page may have been closed or test interrupted; continue anyway
        if (e && e.message && !e.message.includes('closed')) {
            console.warn(`⚠️ waitForLoadState error (non-critical): ${e.message}`);
        }
    }
    console.log(`⏳ Processing - locationLocator: ${locationLocator}, sectionLocator: ${sectionLocator}, fieldLocator: ${fieldLocator}, isLabelCheck: ${isLabelCheck}`);
    if (page.isClosed()) {
        console.warn("⚠️ Cannot evaluate locator: Page is already closed.");
        return { locator: "", exists: false, visible: false, enabled: false };
    }
    let result;
    try {
        result = await page.evaluate((args) => {
            const { locationLocator, sectionLocator, fieldLocator, isLabelCheck } = args;
            function queryChain(context, chain) {
                const parts = chain.split(">>").map(p => p.trim());
                let current = context;
                for (const part of parts) {
                    if (!current)
                        return null;
                    let el = current.querySelector(part);
                    if (!el && current instanceof Element && current.shadowRoot) {
                        el = current.shadowRoot.querySelector(part);
                    }
                    if (!el)
                        return null;
                    current = el;
                }
                return current instanceof Element ? current : null;
            }
            function queryElement(context, selector) {
                selector = selector.trim();
                if (selector.includes(">>"))
                    return queryChain(context, selector);
                if (selector.startsWith("//") || selector.startsWith("(")) {
                    const res = document.evaluate(selector, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                    return res.singleNodeValue;
                }
                return context.querySelector(selector);
            }
            let currentContext = document;
            if (locationLocator) {
                const locEl = queryElement(document, locationLocator);
                if (!locEl)
                    return { chain: "", forAttr: "" };
                currentContext = locEl;
            }
            if (sectionLocator) {
                const secEl = queryElement(currentContext, sectionLocator);
                if (!secEl)
                    return { chain: "", forAttr: "" };
                currentContext = secEl;
            }
            const fieldEl = queryElement(currentContext, fieldLocator);
            if (!fieldEl)
                return { chain: "", forAttr: "" };
            if (fieldEl instanceof HTMLElement) {
                const style = window.getComputedStyle(fieldEl);
                const isVisible = fieldEl.offsetParent !== null &&
                    style.visibility !== "hidden" &&
                    style.display !== "none";
                if (!isVisible)
                    return { chain: "", forAttr: "" };
            }
            const parts = [];
            if (locationLocator)
                parts.push(locationLocator.trim());
            if (sectionLocator)
                parts.push(sectionLocator.trim());
            parts.push(fieldLocator.trim());
            const forAttr = isLabelCheck && fieldEl instanceof HTMLElement
                ? fieldEl.getAttribute("for") || ""
                : "";
            return { chain: parts.join(" >> "), forAttr };
        }, { locationLocator, sectionLocator, fieldLocator, isLabelCheck });
    }
    catch (err) {
        console.warn("⚠️ Failed to evaluate locator. Reason:", err.message);
        return { locator: "", exists: false, visible: false, enabled: false };
    }
    if (isLabelCheck) {
        locFieldForId = result.forAttr;
        console.log(`<<<<<< result.forAttr >>>>>>>>>>: ${result.forAttr}`);
    }
    console.log(`<<<<<< result.chain >>>>>>>>>>: ${result.chain}`);
    return {
        locator: result.chain,
        exists: result.chain !== "",
        visible: result.chain !== "",
        enabled: true,
    };
}
/**
 * Returns updated locator entries after replacing placeholders with global values.
 */
async function getLocatorEntries(argType) {
    const preprocessed = locField
        .replace(/\/\{\{/g, "$1$")
        .replace(/\/\{/g, "$2$")
        .replace(/\/\[/g, "$3$");
    const pattern = /^(?:{{([^:}]+)(?:::(.+?))?}}\s*)?(?:{([^:}]+)(?:::(.+?))?}\s*)?(.+?)(?:\[(\d+)\])?$/;
    const match = preprocessed.match(pattern);
    if (match) {
        locLocationName = match[1] ? match[1].trim() : "";
        locLocationValue = match[2] ? match[2].trim() : "";
        locSectionName = match[3] ? match[3].trim() : "";
        locSectionValue = match[4] ? match[4].trim() : "";
        locFieldName = match[5]
            ? match[5]
                .trim()
                .replace(/\$1\$/g, "{{")
                .replace(/\$2\$/g, "{")
                .replace(/\$3\$/g, "[")
            : "";
        locFieldInstance = match[6] ? match[6].trim() : "1";
    }
    else {
        locFieldName = locField
            .trim()
            .replace(/\$1\$/g, "{{")
            .replace(/\$2\$/g, "{")
            .replace(/\$3\$/g, "[")
            .replace(/\$4\$/g, ",");
        locFieldInstance = "1";
    }
    core_1.vars.setValue("loc.auto.fieldName", locFieldName);
    core_1.vars.setValue("loc.auto.fieldName.toLowerCase", locFieldName.toLowerCase());
    core_1.vars.setValue("loc.auto.fieldInstance", locFieldInstance);
    core_1.vars.setValue("loc.auto.forId", locFieldForId);
    core_1.vars.setValue("loc.auto.location.value", locLocationValue);
    core_1.vars.setValue("loc.auto.section.value", locSectionValue);
    core_1.vars.setValue("loc.auto.location.name", locLocationName);
    core_1.vars.setValue("loc.auto.section.name", locSectionName);
    locLocation = (locLocationName &&
        (core_1.vars.getValue(patternVarNameLocation + locLocationName) != patternVarNameLocation + locLocationName))
        ? core_1.vars.replaceVariables(core_1.vars.getValue(patternVarNameLocation + locLocationName))
        : "";
    locSection = (locSectionName &&
        (core_1.vars.getValue(patternVarNameSection + locSectionName) != patternVarNameSection + locSectionName))
        ? core_1.vars.replaceVariables(core_1.vars.getValue(patternVarNameSection + locSectionName))
        : "";
    // if (vars.getValue("loc.auto.default.location.name", true) != "" && locLocation == "") {
    //   locLocation = vars.getValue("loc.auto.default.location.name");
    // }
    // console.log(">> locLocation:", locLocation);
    // console.log(">> locLocationName:", locLocationName);
    // console.log(">> locLocationValue:", locLocationValue);
    // console.log(">> locSection:", locSection);
    // console.log(">> locSectionName:", locSectionName);
    // console.log(">> locSectionValue:", locSectionValue);
    // console.log(">> locFieldName:", locFieldName);
    // console.log(">> locFieldInstance:", locFieldInstance);
    if (core_1.vars.getValue(patternVarNameField + argType) == patternVarNameField + argType) {
        console.warn(`❌ No valid locators found for type "${argType}".`);
        return [];
    }
    // console.log(">>>>>>>>>>>>>> vars.getValue(patternVarNameField + argType) >>>>>>>>>>>>>>>", vars.getValue(patternVarNameField + argType));
    return core_1.vars.replaceVariables(core_1.vars.getValue(patternVarNameField + argType)).split(";");
}
/**
 * Checks locator type.
 */
async function checkLocatorType(locator) {
    const trimmed = locator.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("(")) {
        return "xpath";
    }
    return "css";
}
/**
 * Logging function.
 */
function log(message) {
    // logFixture.setLogger("Pattern Logging: " + message);
    // if (loggingStatus) console.log(`Pattern Logging: ${message}`);
}
/**
 * Scroll page helper.
 */
async function scrollPage(page) {
    if (page.isClosed()) {
        console.warn("⚠️ Cannot scroll: Page is already closed.");
        return;
    }
    const scrollList = (core_1.vars.getValue(patternVarNameSroll) != patternVarNameSroll)
        ? core_1.vars.replaceVariables(core_1.vars.getValue(patternVarNameSroll))
        : "";
    if (scrollList.trim() !== "") {
        const scrollSelectors = scrollList.split(";").map(e => e.trim());
        for (const scrollSelector of scrollSelectors) {
            const locator = page.locator(scrollSelector);
            const count = await locator.count();
            for (let i = 0; i < count; i++) {
                const item = locator.nth(i);
                if (await item.isVisible()) {
                    console.log(`🔄 Scrolling to visible scroll element: ${scrollSelector} [${i}]`);
                    await item.scrollIntoViewIfNeeded();
                    for (let j = 0; j < 10; j++) {
                        await page.mouse.wheel(0, 400);
                        await page.waitForTimeout(500);
                    }
                }
            }
        }
    }
    else {
        for (let i = 0; i < 10; i++) {
            await page.mouse.wheel(0, 400);
            await page.waitForTimeout(500);
        }
    }
    return;
}
/**
 * Helper function that loops through locator candidates, scrolls between retries,
 * and returns a valid LocatorResult or null if none is found.
 */
async function validateLocatorLoop(page, timeout, interval) {
    // const page = webFixture.getCurrentPage();
    const startTime = Date.now();
    const labelLocators = await getLocatorEntries("label");
    while (Date.now() - startTime < timeout) {
        // Only perform label resolution if the tag is eligible
        if (labelLocators.length > 0 && locFieldForId == "") {
            // Try to get the domNode tag name for the field (simulate or retrieve as appropriate)
            // For this context, we assume locType is the tag name.
            if (LABEL_ELIGIBLE_TAGS.has(locType)) {
                for (let locator of labelLocators) {
                    log(`>>>>> locFieldInstance: ${locFieldInstance}`);
                    let locatorWithInstance = (await checkLocatorType(locator)) === "xpath" && locLocationName === "" &&
                        locSectionName === "" &&
                        !locator.startsWith("(")
                        ? `(${locator})[${locFieldInstance}]`
                        : locator;
                    log(`🔍 Processing label locator: ${locatorWithInstance}`);
                    const result = await evaluateChainedLocator(page, locLocation, locSection, locatorWithInstance, true);
                }
            }
            else {
                console.debug(`⏭️ Skipping label check for tag: ${locType}`);
            }
        }
        const fieldLocators = await getLocatorEntries(locType);
        for (let locator of fieldLocators) {
            let locatorWithInstance = (await checkLocatorType(locator)) === "xpath" && locLocationName === "" &&
                locSectionName === "" &&
                !locator.startsWith("(")
                ? `(${locator})[${locFieldInstance}]`
                : locator;
            log(`🔍 Processing Field locator: ${locatorWithInstance}`);
            try {
                const result = await evaluateChainedLocator(page, locLocation, locSection, locatorWithInstance, false);
                if (result && result.exists && result.visible) {
                    console.log(`✅ Valid locator found: ${result.locator}`);
                    return result;
                }
            }
            catch (error) {
                console.warn(`❌ Error processing locator: ${locator} – ${error.message}`);
            }
        }
        // Scroll to reveal lazy-loaded elements.
        if (page.isClosed()) {
            console.warn("⚠️ Cannot continue loop: Page is already closed.");
            return null;
        }
        await scrollPage(page);
        console.log(`⏳ Locator not found. Retrying in ${interval / 1000} seconds...`);
        await page.waitForTimeout(interval);
    }
    return null;
}
/**
 * Resets all global locator variables to their default state.
 * This function ensures clean context between each field processing.
 */
async function resetValues() {
    // Clear all global locator variables
    locField = "";
    locType = "";
    locFieldName = "";
    locFieldInstance = "";
    locFieldForId = "";
    locSection = "";
    locSectionName = "";
    locSectionValue = "";
    locLocation = "";
    locLocationName = "";
    locLocationValue = "";
    patternVarNameField = "";
    patternVarNameLocation = "";
    patternVarNameSection = "";
    patternVarNameSroll = "";
    // Clear all related variables in the global vars store
    const varsToReset = [
        "loc.auto.forId",
        "loc.auto.fieldName",
        "loc.auto.fieldName.toLowerCase",
        "loc.auto.fieldInstance",
        "loc.auto.location.value",
        "loc.auto.section.value",
        "loc.auto.location.name",
        "loc.auto.section.name",
        "loc.auto.default.location.name",
        "loc.auto.default.section.name"
    ];
    for (const varName of varsToReset) {
        core_1.vars.setValue(varName, "");
    }
    console.log("🔄 All locator variables have been reset.");
}
/**
 * Main function that assigns globals, updates locator entries,
 * and calls the locator validation loop.
 */
async function patternIq(page, argType, argField, argOverridePattern, argTimeout) {
    if (!page)
        throw new Error("Page not initialized");
    try {
        await page.waitForLoadState("load", { timeout: 5000 });
    }
    catch (e) {
        // Page may have been closed or test interrupted; continue anyway
        if (e && e.message && !e.message.includes('closed')) {
            console.warn(`⚠️ waitForLoadState error (non-critical): ${e.message}`);
        }
    }
    resetValues();
    locField = argField.trim();
    locType = argType.trim();
    let patternConfig;
    if (argOverridePattern) {
        patternConfig = argOverridePattern.trim();
    }
    else {
        patternConfig = (core_1.vars.getConfigValue("patternIq.config") === "config.patternIq.config")
            ? ""
            : core_1.vars.getConfigValue("patternIq.config");
        if (patternConfig === "")
            throw new Error(`❌ No pattern file name found. Please check your config.`);
    }
    console.log(`🔍 Using pattern patternConfig: ${patternConfig}`);
    patternVarNameField = "pattern." + patternConfig.trim() + ".fields.";
    patternVarNameLocation = "pattern." + patternConfig.trim() + ".locations.";
    patternVarNameSection = "pattern." + patternConfig.trim() + ".sections.";
    patternVarNameSroll = "pattern." + patternConfig.trim() + ".scroll";
    const timeout = (argTimeout) ? argTimeout : (core_1.vars.getConfigValue('patternIq.retryTimeout') != 'config.patternIq.retryTimeout') ? Number(core_1.vars.getConfigValue('patternIq.retryTimeout')) : 30 * 1000;
    const interval = (core_1.vars.getConfigValue('patternIq.retryInterval') != 'config.patternIq.retryInterval') ? Number(core_1.vars.getConfigValue('patternIq.retryInterval')) : 2000;
    const result = await validateLocatorLoop(page, timeout, interval);
    if (result && result.exists && result.visible) {
        console.log(`🎉 Locator successfully found: ${result.locator}`);
        // Only apply .nth() if locator does not already end with an instance selector (e.g., [1])
        const hasInstance = /\[\d+\]\s*$/.test(result.locator);
        if (!hasInstance) {
            return page.locator(result.locator.toString()).nth(parseInt(locFieldInstance) - 1);
        }
        else {
            return page.locator(result.locator.toString());
        }
    }
    else {
        console.warn(`⚠️ Timeout reached! No valid locator found for type "${argType}" with field name "${argField}".`);
        return page.locator("");
    }
}
