"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorResponse = exports.createSuccessResponse = void 0;
// Utility functions for creating standardized responses
const createSuccessResponse = (payload, metadata) => ({
    status: true,
    payload,
    metadata: {
        timestamp: new Date().toISOString(),
        ...metadata,
    },
});
exports.createSuccessResponse = createSuccessResponse;
const createErrorResponse = (error, metadata) => ({
    status: false,
    error,
    metadata: {
        timestamp: new Date().toISOString(),
        ...metadata,
    },
});
exports.createErrorResponse = createErrorResponse;
