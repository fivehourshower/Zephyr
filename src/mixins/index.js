"use strict";

global.$ = global.jQuery = require("backbone").$ = require("jquery");
// For ros-backbone + internal
global.Promise = require("native-promise-only");

require("./leaflet-setup");
require("./service-worker");
require("./Handlebar-mixins");
