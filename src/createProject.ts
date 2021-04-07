import { resolve } from "path";
import shell from "shelljs";

import { deleteFile, installCmd, parseAndDeleteTemp } from "@/utils";
import { lineSpaceLog, normalLog } from "@/log";

import { ELanguage, EProjectConfig, ETempPath } from "@/constans";

export const createProject = async (
    projectConfig: Record<EProjectConfig, string>,
    projectPath: string
) => {
    const gitFile = resolve(projectPath, ".git");
    deleteFile(gitFile);

    await parseAndDeleteTemp({
        from: resolve(projectPath, "package.json.tmp"),
        to: resolve(projectPath, "package.json"),
        setting: projectConfig,
    });

    await parseAndDeleteTemp({
        from: resolve(projectPath, "gulpfile.js.tmp"),
        to: resolve(projectPath, "gulpfile.js"),
        setting: projectConfig,
    });

    normalLog("> 开始创建模版...");
    shell.cd(projectPath);
    if (projectConfig.Language === ELanguage.Javascript) {
        shell.cp("-Rf", ETempPath.Javascript + "/*", projectPath);
    }

    if (projectConfig.Language === ELanguage.Typescript) {
        shell.cp("-Rf", ETempPath.Typescript + "/*", projectPath);
    }

    shell.rm(
        "-rf",
        resolve(projectPath, ETempPath.Javascript),
        resolve(projectPath, ETempPath.Typescript)
    );

    normalLog("> 模版创建成功，开始安装依赖...");
    const cmd = installCmd();
    shell.exec(cmd as string);

    normalLog("> 项目创建成功");
    lineSpaceLog();
};
