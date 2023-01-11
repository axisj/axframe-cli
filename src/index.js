#!/usr/bin/env node

import { program } from "commander";
import { ACTIONS } from "./actions.js";
import { msg } from "./msgs.js";

program.name("axframe-cli").version("0.0.1", "-v, --version");

program
  .argument("<action>", "")
  .option("-t, --tag [tag]", "axframe core version", "latest")
  .option("-nm, --name [name]", "page name", "myProgram")
  .action((name, options) => {
    if (!Object.keys(ACTIONS).includes(name)) {
      console.log(msg.notFoundCommand);
      program.help();
      return;
    }

    // console.log(name, options);
    try {
      ACTIONS[name](options);
    } catch (err) {
      console.log(msg.getErrorMsg(err));
    }
  });

program.addHelpText("after", msg.usage);

program.parse(process.argv);
