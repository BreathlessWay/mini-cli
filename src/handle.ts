import cli from "@/command";

if (cli.debug) {
  console.log(cli.opts());
}

if (cli.projectName) {
  console.log(`- ${cli.projectName}`);
}
