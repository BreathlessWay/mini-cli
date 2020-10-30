import commander from "commander";

export interface InterfaceCLI extends commander.Command {
    debug?: boolean;
    init?: boolean;
    gen?: string;
}
