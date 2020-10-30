import { Command } from "commander";

import { handleOptions } from "@/handleOptions";

import { lineSpaceLog } from "@/log";

import { InterfaceCLI } from "@/types/cli";

const packageJson = require("../package.json");

const cli: InterfaceCLI = new Command();

cli.description("Generate Mini Program Template")
    .version(packageJson.version, "-v, --version")
    .option("-d, --debug", "show debug info")
    .option("-i, --init", "init project")
    .option(
        "-g, --gen <path>",
        "generate babel helper and runtime to your path"
    )
    .action((option: InterfaceCLI) => {
        handleOptions(option);
    })
    .on("--help", () => {
        lineSpaceLog();
        console.log("Example call:");
        console.log("  $ mini --help");
        lineSpaceLog();
    })
    .parse(process.argv);
