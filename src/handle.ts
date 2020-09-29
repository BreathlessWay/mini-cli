import inquirer from "inquirer";

import { InterfaceCLI } from "@/types/cli";

import questions from "@/questions";

export const handleOptions = (option: InterfaceCLI) => {
  if (option.debug) {
    console.log(option.opts());
    return;
  }

  if (!option.init) {
    console.log(option.help());
    return;
  }

  inquirer.prompt(questions).then((answers) => {
    console.log("\nOrder receipt:");
    console.log(JSON.stringify(answers, null, "  "));
  });
};
