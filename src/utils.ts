import { access, constants } from "fs";
import { Spinner } from "clui";

const clone = require("git-clone");

export const spinner = new Spinner("");

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
