import { resolve } from "path";
import { access, constants } from "fs";
import inquirer from "inquirer";
import shell from "shelljs";

import { overrideQuestion } from "@/questions";

import { EProjectConfig, GitUrl } from "@/constans";

import log from "@/log";

const clone = require("git-clone");

export const create = (projectName: string) => {
    try {
        const projectPath = resolve(projectName);

        access(projectPath, constants.F_OK, async (err) => {
            if (!err) {
                const override = await inquirer.prompt(overrideQuestion);
                if (override[EProjectConfig.Override]) {
                    shell.rm("-rf", projectName);
                } else {
                    process.exit();
                }
            }
            log.info("\n> 开始获取项目模板");
            clone(GitUrl, projectPath, null, function (err: Error) {
                if (err) {
                    throw err;
                }

                const gitFile = resolve(projectPath, ".git");
                shell.rm("-rf", gitFile);
                shell.cd(projectPath);
                log.info("> 开始安装依赖");
                shell.exec("npm i");
                log.info("> 项目创建成功");
            });
        });
    } catch (e) {
        log.error(e);
    }
};
