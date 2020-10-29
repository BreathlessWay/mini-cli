import { resolve } from "path";
import shell from "shelljs";

import {
    deleteFile,
    installCmd,
    logErrorAndExit,
    parseAndDeleteTemp,
} from "@/utils";
import { errorLog, lineSpaceLog, normalLog } from "@/log";

import { EProjectConfig } from "@/constans";

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

    normalLog("> 开始安装依赖...");
    shell.cd(projectPath);
    const cmd = installCmd();
    shell.exec(cmd as string, (code, stdout, stderr) => {
        normalLog("> 项目创建成功");
        // normalLog(`${cmd} code Exit code: ${code}`);
        // normalLog(`${cmd} stdout Exit code: ${stdout}`);
        // errorLog(`${cmd} stderr Exit code: ${stderr}`);
    });
    lineSpaceLog();
};
