const express = require("express");
require("dotenv/config");

const { loggerMiddleware } = require("./middlewares/logger");

const bookRouter = require("./routes/book.routes");
const authorRouter = require("./routes/author.routes");

const app = express();
const PORT = 8000;

// Middlewares (Plugins)
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.listen(PORT, () => console.log(`Http server is running on PORT ${PORT}`));
