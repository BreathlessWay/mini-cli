import { userInfo } from "os";

import { ECss, ELanguage, EProjectConfig } from "@/constans";

const questions = [
    {
        type: "input",
        name: EProjectConfig.Author,
        message: "The author of this mini program",
        default: userInfo().username,
    },
    {
        type: "input",
        name: EProjectConfig.Description,
        message: "The description of this mini program",
        default: "mini program",
    },
    {
        type: "list",
        name: EProjectConfig.Language,
        message: "What language do you prefer to use?",
        choices: [ELanguage.Typescript, ELanguage.Javascript],
    },
    {
        type: "list",
        name: EProjectConfig.CSS,
        message: "What css do you prefer to use?",
        choices: [ECss.Wxss, ECss.Css, ECss.Sass, ECss.Less],
    },
];

export default questions;
