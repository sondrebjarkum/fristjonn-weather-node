import express from "express";
import compression from "compression";
import { Routes } from "./src/routes/index.mjs";
import { Cities_NO } from "./src/types/cities.mjs";

const app = express();
app.use(compression({ level: 9 }));

const PORT = 4000;

app.get("/hjelp", async (req, res) => {
  const helpDocument = `Endepunkter: /, /langtid, /koor, /by`;
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.status(200);
  res.send(helpDocument);
});

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

app.get("/koor", async (req, res) => {
  const { query } = req;
  const forecastDocument = await Routes.koor.handle(query);
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.status(200);
  res.send(forecastDocument);
});

app.get("/by/:city", async (req, res) => {
  const city = req.params.city;
  const coordinates = Cities_NO[city];
  const forecastDocument = await Routes.by.handle({
    ...coordinates,
    city,
    country: "Norge",
  });

  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.status(200);
  res.send(forecastDocument);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
export default app;
