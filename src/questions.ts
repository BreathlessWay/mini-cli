import { userInfo } from "os";
import inquirer from "inquirer";

import { errorChalk, questionChalk } from "@/log";

import { ECss, ELanguage, EProjectConfig } from "@/constans";

export const projectQuestions: Array<inquirer.QuestionCollection> = [
    {
        type: "input",
        name: EProjectConfig.ProjectName,
        message: questionChalk("The name of this mini program"),
        validate: (input: string) => {
            if (input && input.trim()) {
                return true;
            }
            return "project name is required";
        },
    },
    {
        type: "input",
        name: EProjectConfig.Author,
        message: questionChalk("The author of this mini program"),
        default: userInfo().username,
        validate: (input: string) => {
            if (input && input.trim()) {
                return true;
            }
            return "author is required";
        },
    },
    {
        type: "input",
        name: EProjectConfig.Description,
        message: questionChalk("The description of this mini program"),
        default: "mini program",
        validate: (input: string) => {
            if (input && input.trim()) {
                return true;
            }
            return "description is required";
        },
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
