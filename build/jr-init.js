#!/usr/bin/env node

var clone = require('git-clone');
var commander = require("commander");
var fs = require('fs')
var path = require('path')
var chalk = require('chalk')

/**
 * Help.
 */

commander.on('--help', function () {
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # init a new project'))
  console.log('    $ jr init my-project')
  console.log()
})

/**
 * Help.
 */

function help () {
  commander.parse(process.argv)
  if (commander.args.length !== 1) return commander.help()
}
help()

var folder = commander.args[0]
//  folder= path.resolve(process.cwd(),folder)
if(fs.existsSync(folder)){
     console.log(chalk.red(folder+" is existed,please change other name\n"))
     return;
}

fs.mkdir(folder, function (err) {
    if(err) {
	    console.log(err);
    }else{
        console.log('make '+folder+' success\n');
        console.log(chalk.yellow('downLoad template begin'))
        clone('https://github.com/xxyj/regular-template', folder, {  }, function (err) {
            if (err) {
               console.log('Failed to download repo : ' + err.message.trim())
               return;
            }
            console.log(chalk.yellow('downLoad template finish'))
        })
    }
})


