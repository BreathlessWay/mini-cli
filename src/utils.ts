import { access, constants } from "fs";
import ora from "ora";
import * as memFs from "mem-fs";
import * as editor from "mem-fs-editor";
import shell from "shelljs";

import { errorLog, normalChalk, successChalk } from "@/log";

const clone = require("git-clone");

export const spinner = ora("");

export const isFileExist = (path: string) => {
    return new Promise((resolve) => {
        access(path, constants.F_OK, (err) => {
            resolve(Boolean(!err));
        });
    });
};

export const downloadTemp = ({ url, path }: { url: string; path: string }) => {
    return new Promise((resolve, reject) => {
        clone(url, path, null, (err?: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

export const wrapSpin = async ({
    text,
    func,
    successText,
}: {
    text: string;
    successText: string;
    func: Function;
}) => {
    const loadingLog = spinner.start(normalChalk(text));
    loadingLog.color = "blue";
    await func();
    loadingLog.color = "green";
    loadingLog.succeed(successChalk(successText));
    loadingLog.stop();
};

export const parseTemplate = ({
    from,
    to,
    setting,
}: {
    from: string;
    to: string;
    setting: Record<string, any>;
}) => {
    const fs = editor.create(memFs.create());

    return new Promise((resolve, reject) => {
        fs.copyTpl(from, to, setting);

        fs.commit((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

export const deleteFile = (path: string) => {
    shell.rm("-rf", path);
};

export const parseAndDeleteTemp = async ({
    from,
    to,
    setting,
}: {
    from: string;
    to: string;
    setting: Record<string, any>;
}) => {
    await parseTemplate({
        from,
        to,
        setting,
    });
    deleteFile(from);
};

export const logErrorAndExit = (text: string) => {
    errorLog(text);
    process.exit();
};

export const installCmd = () => {
    const hasNpm = shell.which("npm");

    const hasYarn = shell.which("yarn");

    if (hasYarn) {
        return "yarn";
    }

    if (hasNpm) {
        return "npm install";
    }
};
