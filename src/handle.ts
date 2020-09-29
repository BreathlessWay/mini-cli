import inquirer from "inquirer";
const clone = require("git-clone");

import log from "@/log";

import { InterfaceCLI } from "@/types/cli";

import questions from "@/questions";

import { GitUrl } from "@/constans";

export const handleOptions = async (option: InterfaceCLI) => {
    try {
        if (option.debug) {
            log.fatal(option.opts());
            return;
        }

        if (!option.init) {
            option.help();
            return;
        }
        log.log("");
        log.info("> 配置项目信息：");
        log.log("");

        const answers = await inquirer.prompt(questions);
        log.fatal("\n项目配置:");
        log.log("");
        log.info(JSON.stringify(answers, null, "  "));
        log.log("");

        clone(GitUrl, `./${option.init}`, null, function (err: Error) {
            if (err) {
                throw err;
            }
            log.info("项目构建完成");
            log.info(`清除掉${option.init}的git, 记得进入项目npm install`);
        });
    } catch (e) {
        log.error(e);
    }
};
