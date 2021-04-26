#!/usr/bin/env node

'use strict';

const server = require('./server');
const config = require('./config');

// Start server
if (require.main === module) {
  server.listen(config.port, () => {
    console.log(`API server listening on ${config.host}:${config.port}, in ${config.env}`);
  });
}
