#!/usr/bin/env node

require('dotenv').config(); //iti ia variabilele de mediu si le stocheaza local la nivelul aplicatiei
const app = require('./app');
const http = require('http');
const logger = require('pino')(); //pino e librarie de mesaje importata ca si logger

/**
 * Make sure to fallback to development environment.
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '9000';
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) { //arunca exceptie daca serverul nu a pornit
  if (error.syscall !== 'listen') {
    throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  logger.info(`Listening on ${addr.port}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
