import commander from "commander";

export interface InterfaceCLI extends commander.Command {
    debug?: boolean;
    init?: boolean;
    gen?: string;
}

export type TemplateInfo = {
    Typescript: Array<string>;
    Javascript: Array<string>;
    Less: Array<string>;
    "Sass/Scss": Array<string>;
    Css: Array<string>;
    Wxss: Array<string>;
};
