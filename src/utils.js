import fs from "fs";
import path from "path";
import chalk from "chalk";
import fetch from "node-fetch";

export const exist = (dir) => {
  // 폴더 존제 확인 함수
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

export const mkdir = (dir) => {
  // 경로 생성 함수
  const dirname = path
    .relative(".", path.normalize(dir))
    .split(path.sep)
    .filter((p) => !!p);

  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

export const makeTemplate = (type, name, directory) => {
  // 템플릿 생성 함수
  mkdir(directory);

  if (type === "html") {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red("이미 해당 파일이 존재합니다"));
    } else {
      // fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(chalk.green(pathToFile, "생성 완료"));
    }
  } else if (type === "express-router") {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red("이미 해당 파일이 존재합니다"));
    } else {
      // fs.writeFileSync(pathToFile, routerTemplate);
      console.log(chalk.green(pathToFile, "생성 완료"));
    }
  } else {
    console.error(chalk.bold.red("html 또는 express-router 둘 중 하나를 입력하세요."));
  }
};

export const gitReleaseSource = async () => {
  const response = await fetch("https://api.github.com/repos/axisj/axframe/releases");
  const [data] = await response.json();

  console.log(data.zipball_url);

  // 다운로드
  // https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries

  // 압축풀기
  // https://www.npmjs.com/package/extract-zip

  // 버전 비교하고

  // 덮어쓰기
};
