import { access, constants } from "fs";
import ora from "ora";
import * as memFs from "mem-fs";
import * as editor from "mem-fs-editor";
import shell from "shelljs";

import { normalChalk, successChalk } from "@/log";

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
    const store = memFs.create();
    const fs = editor.create(store);

    return new Promise((resolve, reject) => {
        fs.copyTpl(from, to, setting);

        fs.commit((err) => {
            if (err) {
                reject(err);
            } else {
                shell.rm("-rf", from);
                resolve();
            }
        });
    });
};
