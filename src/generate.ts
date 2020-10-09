import { resolve } from "path";
import shell from "shelljs";

import { parseTemplate } from "@/utils";
import { lineSpaceLog, normalLog } from "@/log";

import { EProjectConfig } from "@/constans";

export const generate = async (
    projectConfig: Record<EProjectConfig, string>,
    projectPath: string
) => {
    const gitFile = resolve(projectPath, ".git");
    shell.rm("-rf", gitFile);
    // TODO 解析替换生成 package.json 和 gulpfile
    // TODO mem-fs mem-fs-editor 和 ejs 解析模板

    await parseTemplate({
        from: resolve(projectPath, "package.json.tmp"),
        to: resolve(projectPath, "package.json"),
        setting: projectConfig,
    });

    await parseTemplate({
        from: resolve(projectPath, "gulpfile.js.tmp"),
        to: resolve(projectPath, "gulpfile.js"),
        setting: projectConfig,
    });

    normalLog("> 开始安装依赖...");
    shell.cd(projectPath);
    shell.exec("npm i");
    lineSpaceLog();
    normalLog("> 项目创建成功");
};
