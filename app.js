const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const notesRouter = require("./controllers/notes");
const middleWare = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("conncecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleWare.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleWare.unKnownEndpoint)
app.use(middleWare.errorHandler)

module.exports = app

