"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeStoredProcedure = void 0;
const client_1 = require("@prisma/client");
const primsaClient = new client_1.PrismaClient();
/**
 * Executes a PostgreSQL stored procedure using Prisma.
 * @param procedureName - Name of the stored procedure.
 * @param params - Optional parameters for the procedure.
 * @returns The result of the stored procedure execution.
 */
const executeStoredProcedure = (procedureName_1, ...args_1) => __awaiter(void 0, [procedureName_1, ...args_1], void 0, function* (procedureName, params = []) {
    try {
        const paramPlaceholders = params.map((_, index) => `$${index + 1}`).join(', ');
        // If we are passing an array, cast it explicitly
        const query = `SELECT * FROM ${procedureName}($1::integer[])`;
        const result = yield primsaClient.$queryRawUnsafe(query, params);
        return result;
    }
    catch (error) {
        console.error(`Error executing stored procedure ${procedureName}:`, error);
        throw error;
    }
});
exports.executeStoredProcedure = executeStoredProcedure;
exports.default = primsaClient;
