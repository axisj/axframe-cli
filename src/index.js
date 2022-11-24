#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import { ACTIONS } from "./actions.js";

program.version("0.0.1", "-v, --version").name("cli");

program
  .command("template <type>")
  .usage("<type> --filename [filename] --path [path]")
  .description("템플릿을 생성합니다.")
  .alias("tmpl")
  .option("-f, --filename [filename]", "파일명을 입력하세요.", "index")
  .option("-d, --directory [path]", "생성 경로를 입력하세요", ",");

program
  .action((type, options) => {
    // console.log("------------------------");
    // console.log(type);
    // console.log("------------------------");
    // console.log(options);
    // console.log("------------------------");

    if (options.args.length > 0 && !Object.keys(ACTIONS).includes(type)) {
      console.log(chalk.bold.red("The command could not be found."));
      program.help();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "type",
          message: "템플릿 종류를 선택하세요.",
          choices: ["html", "express-router"],
        },
        {
          type: "input",
          name: "name",
          message: "파일의 이름을 입력하세요.",
          default: "index",
        },
        {
          type: "input",
          name: "directory",
          message: "파일이 위치할 폴더의 경로를 입력하세요.",
          default: ".",
        },
        {
          type: "confirm",
          name: "confirm",
          message: "생성하시겠습니까?",
        },
      ])
      .then((answers) => {
        if (answers.confirm) {
          // makeTemplate(answers.type, answers.name, answers.directory);
          console.log(chalk.rgb(128, 128, 128)("터미널을 종료합니다."));
        }
      });
  })
  .parse(process.argv);
