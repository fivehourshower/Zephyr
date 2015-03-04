#!/bin/env node

import express from 'express';
import resync from './sync/resync';
import logalog from './utils/logalog'

let app = express();
let port = process.env.PORT || 3001;

// Resync resources once an hour
logalog.debug('\n\n\tPrepared resync once every hour.\n\n');
setInterval(resync, 3.6e6);

app.use(express.static('./dist'));
logalog.info('Now listening on port', port);
logalog.info(`Navigate to http://localhost:${port}`);
app.listen(port);
