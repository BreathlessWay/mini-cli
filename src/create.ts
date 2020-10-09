import { resolve } from "path";
import inquirer from "inquirer";
import shell from "shelljs";

import { generate } from "@/generate";

import { downloadTemp, isFileExist, spinner } from "@/utils";
import { lineSpaceLog, normalLog } from "@/log";

import { overrideQuestion } from "@/questions";

import { EProjectConfig, GitUrl } from "@/constans";

export const create = async (projectConfig: Record<EProjectConfig, string>) => {
    const projectPath = resolve(projectConfig[EProjectConfig.ProjectName]);

    const exist = await isFileExist(projectPath);
    if (exist) {
        const override = await inquirer.prompt(overrideQuestion);
        if (override[EProjectConfig.Override]) {
            normalLog("> 正在删除原文件");
            shell.rm("-rf", projectPath);
            normalLog("> 删除原文件成功");
        } else {
            throw "";
        }
        lineSpaceLog();
    }

    spinner.start();
    spinner.message("> 开始获取项目模板");
    await downloadTemp({ url: GitUrl, path: projectPath });
    spinner.stop();

    await generate(projectConfig, projectPath);
};
