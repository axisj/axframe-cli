import chalk from "chalk";

export const msg = {
  notFoundCommand: chalk.bold.red("The command could not be found."),
  usage: `
${chalk.yellowBright("Usage: ")}
${chalk.red("axframe-cli")} install                 ${chalk.greenBright("Install axframe by latest version")}
${chalk.red("axframe-cli")} install -t <version>    ${chalk.greenBright("Install axframe by <version>")}
${chalk.red("axframe-cli")} update                  ${chalk.greenBright("Update axframe core")}
${chalk.red("axframe-cli")} update -t <version>     ${chalk.greenBright("Update axframe core by <version>")}
${chalk.red("axframe-cli")} page                    ${chalk.greenBright("Create a new page")}
`,
  getErrorMsg: (err) => chalk.bold.red(err),
};
