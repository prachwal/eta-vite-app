import type { VercelRequest, VercelResponse } from "@vercel/node";

export default (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    res.status(200).json({
      status: true,
      payload: {
        message: "Hello from Express + TypeScript!",
      },
      metadata: {
        timestamp: new Date().toISOString(),
      },
    });
  } else {
    res.status(405).json({
      status: false,
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: "Method not allowed",
      },
    });
  }
};
