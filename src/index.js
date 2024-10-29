const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Capflow Backend");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
