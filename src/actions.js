import { prepareAXFrameCore } from "./utils.js";
import inquirer from "inquirer";

export const ACTIONS = {
  async install() {
    await prepareAXFrameCore();



  },
  async update() {},
  async page() {
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
        }
      });
  },
};
