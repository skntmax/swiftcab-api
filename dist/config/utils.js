"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failureResponse = exports.succesResponse = exports.failureReturn = exports.successReturn = void 0;
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
