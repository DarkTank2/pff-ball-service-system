"use strict";

var express = require("express");
var router = express.Router(); //initiate Router

router.use("/materialize-css", express.static("./node_modules/materialize-css/"));
router.use("/font-awesome", express.static("./node_modules/font-awesome"));
router.use("/jQuery", express.static("./node_modules/jquery"));
router.use("/mathjs", express.static("./node_modules/mathjs"));

module.exports = router;