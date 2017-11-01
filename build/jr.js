#!/usr/bin/env node

"use strict";
var commander = require("commander");
var pkg = require("../package.json");

commander
  .version(pkg.version)
  .command('init [options] <repo>', 'init a JR repo')
  .parse(process.argv);




