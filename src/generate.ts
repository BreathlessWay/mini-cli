import { resolve } from "path";
import shell from "shelljs";

import { normalLog } from "@/log";

import { EProjectConfig } from "@/constans";

export const generate = async (
    projectConfig: Record<EProjectConfig, string>,
    projectPath: string
) => {
    normalLog("> 模板获取成功，开始安装依赖...");
    const gitFile = resolve(projectPath, ".git");
    shell.rm("-rf", gitFile);
    // TODO 解析替换生产 package.json 和 gulpfile
    // TODO mem-fs mem-fs-editor 和 ejs 解析模板
    shell.cd(projectPath);
    shell.exec("npm i");
    normalLog("> 项目创建成功");
};
