#!/usr/bin/env node

var clone = require("git-clone");
var commander = require("commander");
var fsExtra = require("fs-extra");
var fs = require("fs");
var path = require("path");
var chalk = require("chalk");
var inquirer = require("inquirer");

/**
 * Help.
 */

commander.on("--help", function() {
  console.log("  Examples:");
  console.log();
  console.log(chalk.gray("    # init a new project"));
  console.log("    $ jr init my-project");
  console.log();
});

/**
 * Help.
 */

function help() {
  commander.parse(process.argv);
  if (commander.args.length !== 1) return commander.help();
}

/**
 * 问答配置
 */
 function answers(flag){
      inquirer
        .prompt( [{
            type: "input",
            name: "projectName",
            validate(input) {
              var done = this.async();
              setTimeout(function() {
                if (input === "") {
                  done("请先输入项目名称");
                  return;
                }
                done(null, true);
              }, 100);
            },
            message: "请输入项目名称(会作为网页标题):"
          },
          {
            type: "input",
            name: "author",
            default: "hzxiongxu",
            message: "请输入作者名称:"
          },
          {
            type: "input",
            name: "version",
            default: "0.0.1",
            message: "请输入版本号:"
          }])
        .then(ans => {
          if(flag){
             fsExtra.removeSync(folder)
             console.log(chalk.green("删除目录'" + folder + "' 成功\n"));
          }
         getTemplate(ans)
        });
    }

/**
 * 模板下载更新
 */
 function getTemplate(ans){
      fs.mkdirSync(folder)
      console.log(chalk.green("新建目录'" + folder + "' 成功\n"));
      console.log(chalk.blue("开始下载模板"));
      setTimeout(() => {
        console.log(chalk.blue("模板下载中,请稍后"));
      }, 100);
      clone("https://github.com/xxyj/regular-template", folder, {}, function(
        err
      ) {
        if (err) {
          console.log(chalk.red("下载模板失败 : " + err.message.trim()));
          return;
        }
        console.log(chalk.green("模板下载成功"));
        console.log(chalk.blue("更新模板数据"));
        var package = folder + "/package.json"
        if (!fs.existsSync(package)) {
          console.red(chalk.blue("缺少package.json，更新失败"));
          return;
        }
        fs.readFile(package, {flag: 'r+', encoding: 'utf8'}, (err, data) => {
            if(err){
                  console.log(chalk.red(err));
                  return;
              }
              var  data= JSON.parse(data);
              data.description = ans.projectName
              data.author = ans.author
              data.version = ans.version
              data = JSON.stringify(data,null, "\t");
              fs.writeFile(package, data, (err) => {
                  if(err){
                      console.log(chalk.red(err));
                      return;
                  }
                  console.log(chalk.green("模板更新成功"));
              })
        });
      });
 }
help();
var  folder = commander.args[0];
/**
 * 开始配置模板
 */ 
if (fs.existsSync(folder)) {
    inquirer.prompt([{
        type: "confirm",
        name:"cover",
        message: "目录已存在，是否覆盖？:"
    }])
    .then(ans => {
        if(ans.cover){
          answers(true);
        }
    })
}else{
    answers();
}


   