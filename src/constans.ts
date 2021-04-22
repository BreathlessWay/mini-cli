export enum EProjectConfig {
    ProjectName = "ProjectName",
    Author = "Author",
    Description = "Description",
    Language = "Language",
    CSS = "CSS",
    Override = "Override",
    UseGithubSource = "UseGithubSource",
}

export enum ELanguage {
    Typescript = "Typescript",
    Javascript = "Javascript",
}

export enum ECss {
    Wxss = "Wxss",
    Css = "Css",
    Sass = "Sass/Scss",
    Less = "Less",
}

export enum EGithubSource {
    SSH = "SSH",
    HTTPS = "HTTPS",
}

export const GithubSource = {
    [EGithubSource.SSH]: "git@github.com:BreathlessWay/mini-temp.git",
    [EGithubSource.HTTPS]: "https://github.com/BreathlessWay/mini-temp.git",
};

export const BaseDir = "src";
