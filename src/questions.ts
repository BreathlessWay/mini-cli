import { userInfo } from "os";

import { errorChalk, questionChalk } from "@/log";

import { ECss, ELanguage, EProjectConfig } from "@/constans";

export const projectQuestions = [
    {
        type: "input",
        name: EProjectConfig.Author,
        message: questionChalk("The author of this mini program"),
        default: userInfo().username,
    },
    {
        type: "input",
        name: EProjectConfig.Description,
        message: questionChalk("The description of this mini program"),
        default: "mini program",
    },
    {
        type: "list",
        name: EProjectConfig.Language,
        message: questionChalk("What language do you prefer to use?"),
        choices: [ELanguage.Typescript, ELanguage.Javascript],
    },
    {
        type: "list",
        name: EProjectConfig.CSS,
        message: questionChalk("What css do you prefer to use?"),
        choices: [ECss.Wxss, ECss.Css, ECss.Sass, ECss.Less],
    },
];

export const overrideQuestion = [
    {
        type: "confirm",
        name: EProjectConfig.Override,
        message: errorChalk("当前目录已存在同名文件，是否删除原文件?"),
        default: false,
    },
];
