import { resolve, join } from "path";
import shell from "shelljs";
import glob from "glob";

import { deleteFile, installCmd, parseAndDeleteTemp } from "@/utils";
import { lineSpaceLog, normalLog } from "@/log";

import { BaseDir, ECss, ELanguage, EProjectConfig } from "@/constans";
import { generateTemplate } from "@/scanSrc";
import { TemplateInfo } from "@/types/cli";

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
        from: resolve(projectPath, ".babelrc.tmp"),
        to: resolve(projectPath, ".babelrc"),
        setting: projectConfig,
    });

    await parseAndDeleteTemp({
        from: resolve(projectPath, "gulpfile.js.tmp"),
        to: resolve(projectPath, "gulpfile.js"),
        setting: projectConfig,
    });

    normalLog("> 开始创建模版...");
    shell.cd(projectPath);

    let ignoreFile = glob.sync("src/helpers/*");
    ignoreFile = ignoreFile?.map((file) => join(file)) || [];
    const templateInfo = generateTemplate(
        BaseDir,
        void 0,
        ignoreFile
    ) as TemplateInfo;

    if (projectConfig.Language === ELanguage.Javascript) {
        shell.rm("-rf", templateInfo.Typescript);
    }

    if (projectConfig.Language === ELanguage.Typescript) {
        shell.rm("-rf", templateInfo.Javascript);
    }

    if (projectConfig.CSS === ECss.Wxss) {
        shell.rm("-rf", templateInfo.Css);
        shell.rm("-rf", templateInfo.Less);
        shell.rm("-rf", templateInfo["Sass/Scss"]);
    }

    if (projectConfig.CSS === ECss.Css) {
        shell.rm("-rf", templateInfo.Wxss);
        shell.rm("-rf", templateInfo.Less);
        shell.rm("-rf", templateInfo["Sass/Scss"]);
    }

    if (projectConfig.CSS === ECss.Less) {
        shell.rm("-rf", templateInfo.Css);
        shell.rm("-rf", templateInfo.Wxss);
        shell.rm("-rf", templateInfo["Sass/Scss"]);
    }

    if (projectConfig.CSS === ECss.Sass) {
        shell.rm("-rf", templateInfo.Css);
        shell.rm("-rf", templateInfo.Less);
        shell.rm("-rf", templateInfo.Wxss);
    }

    normalLog("> 模版创建成功，开始安装依赖...");
    const cmd = installCmd();
    shell.exec(cmd as string);

    normalLog("> 项目创建成功");
    lineSpaceLog();
};
