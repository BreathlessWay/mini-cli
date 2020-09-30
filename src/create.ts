import { resolve } from "path";
import { access, constants } from "fs";
import inquirer from "inquirer";
import shell from "shelljs";

import { generate } from "@/generate";

import log from "@/log";

import { overrideQuestion } from "@/questions";

import { EProjectConfig, GitUrl } from "@/constans";

const clone = require("git-clone");

export const create = (projectConfig: Record<EProjectConfig, string>) => {
    try {
        const projectPath = resolve(projectConfig[EProjectConfig.ProjectName]);

        access(projectPath, constants.F_OK, async (err) => {
            if (!err) {
                const override = await inquirer.prompt(overrideQuestion);
                if (override[EProjectConfig.Override]) {
                    shell.rm("-rf", projectPath);
                } else {
                    process.exit(1);
                }
            }
            log.info("\n> 开始获取项目模板");
            clone(GitUrl, projectPath, null, async (err: Error) => {
                if (err) {
                    throw err;
                }
                generate(projectConfig, projectPath);
            });
        });
    } catch (e) {
        log.error(e);
    }
};
