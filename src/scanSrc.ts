import { readdirSync, statSync } from "fs";
import { extname, join } from "path";

import { TemplateInfo } from "@/types/cli";

const templateJson = {
    Typescript: [],
    Javascript: [],
    Less: [],
    "Sass/Scss": [],
    Css: [],
    Wxss: [],
};

const ignoreFile = [
    join("src", "helpers", "helpers.js"),
    join("src", "helpers", "runtime.js"),
];

export const generateTemplate = (
    file: string,
    template: TemplateInfo = templateJson
) => {
    if (~ignoreFile.indexOf(file)) {
        return;
    }
    if (file) {
        const stat = statSync(file);
        if (stat.isFile()) {
            const fileExtname = extname(file);
            switch (fileExtname) {
                case ".ts": {
                    template.Typescript.push(file);
                    break;
                }
                case ".js": {
                    template.Javascript.push(file);
                    break;
                }
                case ".less": {
                    template.Less.push(file);
                    break;
                }
                case ".sass":
                case ".scss": {
                    template["Sass/Scss"].push(file);
                    break;
                }
                case ".css": {
                    template.Css.push(file);
                    break;
                }
                case ".wxss": {
                    template.Wxss.push(file);
                    break;
                }
            }
        }
        if (stat.isDirectory()) {
            const res = readdirSync(file);
            res.forEach((item: string) => {
                const _path = join(file, item);
                generateTemplate(_path, template);
            });
        }
        return template;
    } else {
        throw new Error("请传入搜索目录");
    }
};
