import app from "./server";

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // Vercel zaleca logi w formacie JSON
  console.log(
    JSON.stringify({
      level: "info",
      message: `API server listening on port ${port}`,
      timestamp: new Date().toISOString(),
      port,
    })
  );
});

// Export the Express API
module.exports = app;
