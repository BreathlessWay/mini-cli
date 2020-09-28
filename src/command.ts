import { Command } from "commander";

import { InterfaceCLI } from "@/types/cli";

const packageJson = require("../package.json");

const cli: InterfaceCLI = new Command();

cli
  .version(packageJson.version)
  .option("-d, --debug", "show debug info")
  .option("-p, --project-name <name>", "current project name")
  .parse(process.argv)
  .help();

export default cli;
