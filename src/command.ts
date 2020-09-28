import { Command } from "commander";

import { InterfaceCLI } from "@/types/cli";

const packageJson = require("../package.json");

const cli: InterfaceCLI = new Command();

cli
  .description("Generate Mini Program Template")
  .version(packageJson.version)
  .option("-d, --debug", "show debug info")
  .requiredOption("-p, --project-name <name>", "current project name")
  .action((options: InterfaceCLI) => {
    console.log(options.projectName);
  })
  .on("--help", () => {
    console.log("");
    console.log("Example call:");
    console.log("  $ mini --help");
    console.log("");
  })
  .parse(process.argv);

export default cli;
