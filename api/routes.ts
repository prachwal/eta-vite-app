import express from "express";
import { createSuccessResponse, createErrorResponse } from "./types";

const router = express.Router();

router.get("/api/hello", (req, res) => {
  const response = createSuccessResponse({
    message: "Hello from Express + TypeScript!",
  });
  // Log request and response in Vercel-friendly JSON format
  console.log(
    JSON.stringify({
      level: "info",
      endpoint: "/hello",
      method: req.method,
      timestamp: new Date().toISOString(),
      request: { headers: req.headers, query: req.query },
      response: response,
      status: 200,
    })
  );
  res.json(response);
});

router.post("/api/users", (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      const errorResponse = createErrorResponse({
        code: "VALIDATION_ERROR",
        message: "Name is required",
        details: { field: "name" },
      });
      console.log(
        JSON.stringify({
          level: "warn",
          endpoint: "/api/users",
          method: req.method,
          timestamp: new Date().toISOString(),
          request: { headers: req.headers, body: req.body },
          response: errorResponse,
          status: 400,
        })
      );
      return res.status(400).json(errorResponse);
    }

    const user = { id: 1, name };
    const response = createSuccessResponse(user);
    console.log(
      JSON.stringify({
        level: "info",
        endpoint: "/api/users",
        method: req.method,
        timestamp: new Date().toISOString(),
        request: { headers: req.headers, body: req.body },
        response: response,
        status: 201,
      })
    );
    res.status(201).json(response);
  } catch (error) {
    const errorResponse = createErrorResponse({
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred",
      details: error,
    });
    console.log(
      JSON.stringify({
        level: "error",
        endpoint: "/api/users",
        method: req.method,
        timestamp: new Date().toISOString(),
        request: { headers: req.headers, body: req.body },
        response: errorResponse,
        status: 500,
      })
    );
    res.status(500).json(errorResponse);
  }
});

export default router;
