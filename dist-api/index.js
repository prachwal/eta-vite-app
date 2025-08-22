"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// CORS headers dla Vercel
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
// Use the API router under /api so incoming requests to /api/* match
app.use("/api", routes_1.default);
// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: false,
        error: {
            code: "INTERNAL_ERROR",
            message: "An unexpected error occurred",
            details: err.message,
        },
    });
});
// Uruchamiaj serwer tylko lokalnie
if (process.env.VERCEL !== "1") {
    // Catch-all handler dla nieistniejących endpointów
    app.use((req, res) => {
        res.status(404).json({
            status: false,
            error: {
                code: "NOT_FOUND",
                message: "Endpoint not found",
            },
        });
    });
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`API server listening on port ${port}`);
    });
}
// Export dla Vercel
exports.default = (req, res) => {
    return app(req, res);
};
