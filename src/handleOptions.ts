import inquirer from "inquirer";
import shell from "shelljs";

import { getTemplate } from "@/getTemplate";
import { generateHelpers } from "@/generateHelpers";

import { logErrorAndExit } from "@/utils";
import { normalLog, configLog, lineSpaceLog } from "@/log";

import { InterfaceCLI } from "@/types/cli";

import { projectQuestions } from "@/questions";
import { EProjectConfig } from "@/constans";

export const handleOptions = async (option: InterfaceCLI) => {
    const { debug, init, gen: genPath } = option;
    try {
        if (debug) {
            configLog(option.opts());
            return;
        }

        if (genPath) {
            await generateHelpers({ genPath });
            return;
        }

        if (!init) {
            option.help();
            return;
        }

        normalLog("> 配置项目：");

        const projectConfig =
            (await inquirer.prompt<Record<EProjectConfig, string>>(
                projectQuestions
            )) || {};

        normalLog("\n> 项目配置信息:");
        configLog(projectConfig);
        lineSpaceLog();

        if (!shell.which("git")) {
            logErrorAndExit("创建项目需要依赖git，请先安装git");
        }

        await getTemplate(projectConfig);
    } catch (e) {
        logErrorAndExit(e);
    }
};
