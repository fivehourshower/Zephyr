#!/bin/env node

import express from 'express';
import partial from 'lodash/function/partial';
import {exec} from 'child_process';

let app = express();
let port = process.env.PORT || 3001;

// Resync resources once an hour
console.log('\n\n\tPrepared resync once every hour.\n\n');
setInterval(partial(exec, 'npm run sync'), 3.6e6);

app.use(express.static('./dist'));
console.log('Now listening on port', port);
app.listen(process.env.PORT || 3001);
