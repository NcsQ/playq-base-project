"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdatest = void 0;
exports.lambdatest = {
    registerPage: {
        inpt_lastName: (page) => page.getByRole('textbox', { name: 'Last Name*' }),
        inpt_password: (page) => page.getByRole('textbox', { name: 'Password*' }),
        inpt_password_confirm: (page) => page.getByRole('textbox', { name: 'Password Confirm*' }),
    },
};
