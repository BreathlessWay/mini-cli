import chalk from "chalk";
import { terminal } from "terminal-kit";

export const normalLog = (text: string) => {
    console.log(chalk.bold.blue(text));
};

export const configLog = (config: Record<any, any>) => {
    const configDetail = chalk.yellow(
        JSON.stringify(
            config,
            (key, value) => {
                return value || null;
            },
            "  "
        )
    );
    console.log(configDetail);
};

export const lineSpaceLog = () => {
    console.log("");
};

export const questionLog = (text: string) => {
    return chalk.cyan(text);
};

export const errorChalk = (text: string) => chalk.bold.red(text);

export const errorLog = (text: string) => {
    console.log(errorChalk(text));
    process.exit();
};

export const loadingLog = () => {
    // @ts-ignore
    terminal.spinner("dotSpinner");
};
