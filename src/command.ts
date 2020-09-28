import { Command } from "commander";

import { InterfaceCLI } from "@/types/cli";
import inquirer from "inquirer";

import questions from "@/questions";

const packageJson = require("../package.json");

const cli: InterfaceCLI = new Command();

const INIT = "init";

cli
  .command(INIT)
  .description("Generate Mini Program Template")
  .version(packageJson.version)
  // .option("-d, --debug", "show debug info")
  // .option("-p, --project-name <name>", "current project name")
  .action((options: InterfaceCLI) => {
    if (!options.args.length || options.args[0] !== INIT) {
      console.log(options.help());
      return;
    }
    inquirer.prompt(questions).then((answers) => {
      console.log("\nOrder receipt:");
      console.log(JSON.stringify(answers, null, "  "));
    });
  })
  .on("--help", () => {
    console.log("");
    console.log("Example call:");
    console.log("  $ mini --help");
    console.log("");
  })
  .parse(process.argv);

export default cli;
