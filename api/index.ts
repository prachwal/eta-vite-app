import app from "./server";

// Uruchamiaj serwer tylko lokalnie (nie na Vercel)
if (process.env.VERCEL !== "1") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(
      JSON.stringify({
        level: "info",
        message: `API server listening on port ${port}`,
        timestamp: new Date().toISOString(),
        port,
      })
    );
  });
}

// Eksportuj handler dla Vercel
export default app;
