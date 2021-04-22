import { resolve } from "path";
import inquirer from "inquirer";

import { createProject } from "@/createProject";

import { deleteFile, downloadTemp, isFileExist, wrapSpin } from "@/utils";
import { lineSpaceLog, normalLog } from "@/log";

import { overrideQuestion, useGitSource } from "@/questions";

import { EGithubSource, EProjectConfig, GithubSource } from "@/constans";

export const getTemplate = async (
    projectConfig: Record<EProjectConfig, string>
) => {
    const projectPath = resolve(projectConfig[EProjectConfig.ProjectName]);

    const exist = await isFileExist(projectPath);

    if (exist) {
        const override = await inquirer.prompt(overrideQuestion);
        if (override[EProjectConfig.Override]) {
            normalLog("> 正在删除原文件");
            deleteFile(projectPath);
            normalLog("> 删除原文件成功");
        } else {
            throw new Error("请更换项目名称，或删除已存在的文件后重试");
        }
        lineSpaceLog();
    }

    let githubSource = await inquirer.prompt(useGitSource);
    githubSource = githubSource[EProjectConfig.UseGithubSource];
    githubSource = GithubSource[githubSource as EGithubSource];

    await wrapSpin({
        text: "> 开始获取项目模板",
        successText: "> 获取项目模板成功",
        func: async () =>
            await downloadTemp({
                url: githubSource,
                path: projectPath,
            }),
    });
    lineSpaceLog();

    await createProject(projectConfig, projectPath);
};
