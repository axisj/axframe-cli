import fs from "fs";
import path from "path";
import chalk from "chalk";
import extract from "extract-zip";
import os from "os";
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

export async function downloadFile(url, targetName) {
  const res = await fetch(url);
  const fileStream = res.body.pipe(fs.createWriteStream(targetName));

  return await new Promise((resolve, reject) => {
    fileStream.on("error", (err) => {
      reject(err);
    });
    fileStream.on("finish", function () {
      resolve();
    });
  });
}

export const prepareAXFrameCore = async () => {
  const response = await fetch("https://api.github.com/repos/axisj/axframe/tags");
  const [data] = await response.json();

  const zipFilePath = path.join(os.homedir(), "axframe.zip");
  const sourcePath = path.join(os.homedir(), "axframe-core-source");

  await downloadFile(data.zipball_url, zipFilePath);

  mkdir(sourcePath);
  await extract(zipFilePath, {
    dir: sourcePath,
  });
  fs.unlinkSync(zipFilePath);

  const targetFolderName = fs.readdirSync(sourcePath)[0];
  return path.join(os.homedir(), "axframe-core-source", targetFolderName);
};
