import chalk from "chalk";

export const msg = {
  notFoundCommand: chalk.bold.red("The command could not be found."),
  usage: `
${chalk.yellowBright("Usage: ")}
${chalk.red("axframe-cli")} page                    ${chalk.greenBright("Create a new page")}
${chalk.red("axframe-cli")} page -name tomApp       ${chalk.greenBright("Create a new page <name>")}
`,
  getErrorMsg: (err) => chalk.bold.red(err),
};
