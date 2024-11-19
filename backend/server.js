
const express = require('express');
const logger = require('./logger');
const app = express();

// Middleware for logging method entry and exit
app.use((req, res, next) => {
  logger.info(`Entering ${req.method} ${req.url}`);
  res.on('finish', () => {
    logger.info(`Exiting ${req.method} ${req.url} with status ${res.statusCode}`);
  });
  next();
});

// Example endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middleware for error handling and logging exceptions
app.use((err, req, res, next) => {
  logger.error(`Error in ${req.method} ${req.url}: ${err.message}`);
  res.status(500).send('Something went wrong!');
});

const PORT = 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
