"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failureResponse = exports.succesResponse = exports.failureReturn = exports.successReturn = void 0;
exports.transformNavItems = transformNavItems;
exports.generateUsername = generateUsername;
exports.generateEmail = generateEmail;
const successReturn = (data) => {
    return {
        status: true, data
    };
};
exports.successReturn = successReturn;
const failureReturn = (data) => {
    return {
        status: false, data
    };
};
exports.failureReturn = failureReturn;
const succesResponse = (args, res) => {
    return res.send(Object.assign(Object.assign({}, args), { status: 200, error: false }));
};
exports.succesResponse = succesResponse;
const failureResponse = (args, res) => {
    return res.send(Object.assign(Object.assign({}, args), { status: 500, error: true }));
};
exports.failureResponse = failureResponse;
;
;
;
;
;
function transformNavItems(navItems, username, roleType) {
    var _a, _b, _c, _d;
    const transformedArray = [];
    const seenNavItems = new Set();
    let idCounter = 1;
    for (const item of navItems) {
        if (!seenNavItems.has(item.nav_item)) {
            transformedArray.push({
                navlabel: item.sub_menu,
                subheader: item.nav_item,
                href: `/${roleType}/${username}/?tabs=${item === null || item === void 0 ? void 0 : item.href}`
            });
            seenNavItems.add(item.nav_item);
        }
        // having submenu
        if (item.sub_menu) {
            transformedArray.push({
                id: idCounter.toString(),
                title: item.sub_nav_item,
                icon: item.sub_icon,
                href: `/${roleType}/${username}/?tabs=${(_b = (_a = ((item === null || item === void 0 ? void 0 : item.sub_href) || (item === null || item === void 0 ? void 0 : item.href))) === null || _a === void 0 ? void 0 : _a.replace("/", "")) !== null && _b !== void 0 ? _b : ""} `
            });
        }
        // single menu 
        if (!item.sub_menu) {
            transformedArray.push({
                id: idCounter.toString(),
                title: item.nav_item,
                icon: item.icon,
                href: `/${roleType}/${username}/?tabs=${(_d = (_c = (item === null || item === void 0 ? void 0 : item.href)) === null || _c === void 0 ? void 0 : _c.replace("/", "")) !== null && _d !== void 0 ? _d : ""} `
            });
        }
        idCounter++;
    }
    return transformedArray;
}
function generateUsername(name) {
    let lowercaseName = name.toLowerCase().replace(/\s/g, '');
    let randomNumber = Math.floor(Math.random() * 9000) + 1000;
    let randomAlphabets = '';
    for (let j = 0; j < 5; j++) {
        randomAlphabets += String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random lowercase alphabet
    }
    return lowercaseName + randomNumber + randomAlphabets;
}
function generateEmail(name) {
    let lowercaseName = name.toLowerCase().replace(/\s/g, '');
    let randomNumber = Math.floor(Math.random() * 9000) + 1000;
    let randomAlphabets = '';
    for (let j = 0; j < 5; j++) {
        randomAlphabets += String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random lowercase alphabet
    }
    return `${lowercaseName}${randomNumber}${randomAlphabets}@swiftcab.in`;
}
// Helper function (Ensure it's properly defined)
function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
