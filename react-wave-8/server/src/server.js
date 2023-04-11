const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3002;

app.use(
  express.json({
    inflate: true,
    strict: true,
    type: "application/json",
  })
);

app.use(
  cors({
    origin: "*",
    preflightContinue: true,
  }),
  bodyParser.urlencoded({ extended: false })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const start = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Api running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

start(port);

require("./controllers/movies")(app);
require("./controllers/auth")(app);

module.exports = app;
