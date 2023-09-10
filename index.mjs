import express from "express";
import compression from "compression";
import { Routes } from "./src/routes/index.mjs";

const app = express();
app.use(compression({ level: 9 }));

const PORT = 4000;

app.get("/", async (req, res) => {
  const forecastDocument = await Routes.root.handle();
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.status(200);
  res.send(forecastDocument);
});

app.get("/langtid", async (req, res) => {
  const forecastDocument = await Routes.langtid.handle();
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.status(200);
  res.send(forecastDocument);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
export default app;
