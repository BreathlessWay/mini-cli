import { Command } from "commander";

import { handleOptions } from "@/handle";

import { InterfaceCLI } from "@/types/cli";

const packageJson = require("../package.json");

const cli: InterfaceCLI = new Command();

cli
  .description("Generate Mini Program Template")
  .version(packageJson.version, "-v, --version")
  .option("-d, --debug", "show debug info")
  .option("-i, --init <name>", "init project name")
  .action((option: InterfaceCLI) => {
    handleOptions(option);
  })
  .on("--help", () => {
    console.log("");
    console.log("Example call:");
    console.log("  $ mini --help");
    console.log("");
  })
  .parse(process.argv);
