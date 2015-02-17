/// <reference path="jquery.d.ts" />

import SanmokuSim = require("SanmokuSim");
$(function () {
    var ss = new SanmokuSim.SanmokuSim();
    ss.hello("world");
});
