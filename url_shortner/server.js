import "dotenv/config";
import express from "express";

import userRoutes from "./src/routes/user.route.js";
import urlRoutes from "./src/routes/url.route.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/urls", urlRoutes);

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Welcome to the URL Shortener Service!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
