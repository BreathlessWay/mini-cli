import inquirer from "inquirer";

import { create } from "@/create";

import log from "@/log";

import { InterfaceCLI } from "@/types/cli";

import { projectQuestions } from "@/questions";

import { EProjectConfig } from "@/constans";

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

        const projectConfig = {
            [EProjectConfig.ProjectName]: projectName,
            ...answers,
        };

        log.fatal("\n项目配置:");
        log.info(JSON.stringify(projectConfig, null, "  "));

        create(projectConfig);
    } catch (e) {
        log.error(e);
    }
};
