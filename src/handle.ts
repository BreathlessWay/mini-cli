import { access, constants } from "fs";
import { resolve } from "path";
import inquirer from "inquirer";
import rimraf from "rimraf";
const clone = require("git-clone");

import log from "@/log";

import { InterfaceCLI } from "@/types/cli";

import { projectQuestions, overrideQuestion } from "@/questions";

import { EProjectConfig, GitUrl } from "@/constans";

export const handleOptions = async (option: InterfaceCLI) => {
    const { debug, init: projectName } = option;
    try {
        if (debug) {
            log.fatal(option.opts());
            return;
        }

        if (!projectName) {
            option.help();
            return;
        }
        log.info("> 配置项目信息：");

        const answers = (await inquirer.prompt(projectQuestions)) || {};
        log.fatal("\n项目配置:");
        log.info(
            JSON.stringify(
                { [EProjectConfig.ProjectName]: projectName, ...answers },
                null,
                "  "
            )
        );

        const projectPath = resolve(projectName);

        access(projectPath, constants.F_OK, async (err) => {
            if (!err) {
                const override = await inquirer.prompt(overrideQuestion);
                if (override[EProjectConfig.Override]) {
                    rimraf.sync(projectName);
                } else {
                    process.exit();
                }
            }
            log.info("\n> 开始获取项目模板");
            clone(GitUrl, `${projectPath}`, null, function (err: Error) {
                if (err) {
                    throw err;
                }
                log.info("> 项目创建完成");

                const gitFile = resolve(projectPath, ".git");
                rimraf.sync(gitFile);
                log.info(
                    `> 清除掉${projectName}的git, 记得进入项目npm install`
                );
            });
        });
    } catch (e) {
        log.error(e);
    }
};
