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
exports.executeStoredProcedure = executeStoredProcedure;
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
function executeStoredProcedure(procedureName_1) {
    return __awaiter(this, arguments, void 0, function* (procedureName, params = []) {
        try {
            // Construct the query string with explicit type casting
            const query = params.length > 0
                ? `SELECT * FROM ${procedureName}(${params
                    .map((_, index) => `$${index + 1}::${getParameterType(index)}`)
                    .join(', ')})`
                : `SELECT * FROM ${procedureName}()`;
            // Execute the stored procedure using Prisma's $queryRawUnsafe
            const result = yield prismaClient.$queryRawUnsafe(query, ...params);
            return result;
        }
        catch (error) {
            console.error('Error executing stored procedure:', error);
            throw error;
        }
        finally {
            yield prismaClient.$disconnect();
        }
    });
}
// Helper function to determine parameter types
function getParameterType(index) {
    // Define the expected parameter types for the stored procedure
    const parameterTypes = ['text', 'text', 'int']; // Adjust based on your stored procedure
    return parameterTypes[index] || 'text'; // Default to 'text' if not specified
}
exports.default = prismaClient;
