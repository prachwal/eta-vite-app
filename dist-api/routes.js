"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const types_1 = require("./types");
const router = express_1.default.Router();
// GET /api/hello
router.get("/hello", (req, res) => {
    const response = (0, types_1.createSuccessResponse)({
        message: "Hello from Express + TypeScript!",
    });
    console.log(JSON.stringify({
        level: "info",
        endpoint: "/api/hello",
        method: req.method,
        timestamp: new Date().toISOString(),
        request: { headers: req.headers, query: req.query },
        response: response,
        status: 200,
    }));
    res.json(response);
});
// POST /api/users
router.post("/users", (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            const errorResponse = (0, types_1.createErrorResponse)({
                code: "VALIDATION_ERROR",
                message: "Name is required",
                details: { field: "name" },
            });
            console.log(JSON.stringify({
                level: "warn",
                endpoint: "/api/users",
                method: req.method,
                timestamp: new Date().toISOString(),
                request: { headers: req.headers, body: req.body },
                response: errorResponse,
                status: 400,
            }));
            return res.status(400).json(errorResponse);
        }
        const user = { id: Date.now(), name };
        const response = (0, types_1.createSuccessResponse)(user);
        console.log(JSON.stringify({
            level: "info",
            endpoint: "/api/users",
            method: req.method,
            timestamp: new Date().toISOString(),
            request: { headers: req.headers, body: req.body },
            response: response,
            status: 201,
        }));
        res.status(201).json(response);
    }
    catch (error) {
        const errorResponse = (0, types_1.createErrorResponse)({
            code: "INTERNAL_ERROR",
            message: "An unexpected error occurred",
            details: error,
        });
        console.log(JSON.stringify({
            level: "error",
            endpoint: "/api/users",
            method: req.method,
            timestamp: new Date().toISOString(),
            request: { headers: req.headers, body: req.body },
            response: errorResponse,
            status: 500,
        }));
        res.status(500).json(errorResponse);
    }
});
exports.default = router;
