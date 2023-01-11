import { makeTemplate, prepareAXFrameCore } from "./utils.js";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";

export const ACTIONS = {
  async install() {
    const targetFolder = await prepareAXFrameCore();
    console.log("targetFolder", targetFolder);
  },
  async update() {},
  async page(options) {
    const targetFolder = await prepareAXFrameCore();

    const dirs = fs
      .readdirSync(path.join(targetFolder, "pages"), { withFileTypes: true })
      .filter((p) => p.isDirectory())
      .map((p) => p.name);

    const questions = [
      {
        type: "input",
        name: "name",
        message: "프로그램 이름을 입력하세요.",
        default: "myProgram",
      },
      {
        type: "input",
        name: "directory",
        message: "파일이 위치할 폴더의 경로를 입력하세요.",
        default: "./pages",
      },
      {
        type: "list",
        name: "type",
        message: "템플릿 종류를 선택하세요.",
        choices: dirs,
      },
      {
        type: "confirm",
        name: "confirm",
        message: "생성하시겠습니까?",
      },
    ];

    if (options.name) {
      questions.shift();
    }

    inquirer.prompt(questions).then((answers) => {
      if (answers.confirm) {
        const name = answers.name || options.name;
        makeTemplate(answers.type, name, path.join(targetFolder, "pages", answers.type), answers.directory);
      }
    });
  },
};
