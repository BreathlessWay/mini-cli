import inquirer from "inquirer";
import shell from "shelljs";

import { create } from "@/create";

import { errorLog, normalLog, configLog, lineSpaceLog } from "@/log";

import { InterfaceCLI } from "@/types/cli";

import { projectQuestions } from "@/questions";

import { EProjectConfig } from "@/constans";

export const handleOptions = async (option: InterfaceCLI) => {
    const { debug, init: projectName } = option;
    try {
        if (debug) {
            configLog(option.opts());
            return;
        }

        if (!projectName) {
            option.help();
            return;
        }

        normalLog("> 配置项目信息：");

        const answers = (await inquirer.prompt(projectQuestions)) || {};

        const projectConfig = {
            [EProjectConfig.ProjectName]: projectName,
            ...answers,
        };

        normalLog("\n> 项目配置:");
        configLog(projectConfig);
        lineSpaceLog();

        if (!shell.which("git")) {
            errorLog("创建项目需要依赖git，请先安装git");
        }

        create(projectConfig);
    } catch (e) {
        errorLog(e);
    }
};
