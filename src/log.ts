import chalk from "chalk";

export const normalChalk = (text: string) => chalk.bold.blue(text);

export const normalLog = (text: string) => {
    console.log(normalChalk(text));
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

export const questionChalk = (text: string) => chalk.cyan(text);

export const errorChalk = (text: string) => chalk.bold.red(text);

export const errorLog = (text: string) => {
    console.log(errorChalk(text));
};

export const successChalk = (text: string) => chalk.bold.green(text);
