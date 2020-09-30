import { resolve } from "path";
import shell from "shelljs";

import log from "@/log";

import { EProjectConfig } from "@/constans";

export const generate = (
    projectConfig: Record<EProjectConfig, string>,
    projectPath: string
) => {
    try {
        const gitFile = resolve(projectPath, ".git");
        shell.rm("-rf", gitFile);

        // TODO 解析替换生产 package.json 和 gulpfile
        //  mem-fs mem-fs-editor 和 ejs 解析模板
        shell.cd(projectPath);
        log.info("> 开始安装依赖");
        shell.exec("npm i");
        log.info("> 项目创建成功");
    } catch (e) {
        log.error(e);
    }
};
