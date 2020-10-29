import fs from "fs";
import path from "path";

import shelljs from "shelljs";

import { normalLog } from "@/log";

export const generateHelpers = () => {
    const outPath = path.resolve(process.cwd(), "src");

    const helpersWhiteList = [
        "typeof",
        "asyncIterator",
        "asyncGenerator",
        "asyncGeneratorDelegate",
        "asyncToGenerator",
        "classCallCheck",
        "createClass",
        "defineEnumerableProperties",
        "defaults",
        "defineProperty",
        "extends",
        "get",
        "inherits",
        "instanceof",
        "interopRequireDefault",
        "interopRequireWildcard",
        "newArrowCheck",
        "objectDestructuringEmpty",
        "objectWithoutProperties",
        "possibleConstructorReturn",
        "selfGlobal",
        "set",
        "slicedToArray",
        "slicedToArrayLoose",
        "taggedTemplateLiteral",
        "taggedTemplateLiteralLoose",
        "temporalRef",
        "temporalUndefined",
        "toArray",
        "toConsumableArray",
    ];

    const helpRootPath = path.resolve(outPath, "helpers");

    const helperPath = `${helpRootPath}/helpers.js`,
        runtimePath = `${helpRootPath}/runtime.js`;

    shelljs.mkdir(helpRootPath);
    shelljs.cd(__dirname);
    shelljs.exec(
        `npx babel-external-helpers -t global -l ${helpersWhiteList} > ${helperPath}`
    );

    shelljs.cp(
        "-Rf",
        path.resolve(
            __dirname,
            "../node_modules/regenerator-runtime/runtime.js"
        ),
        `${runtimePath}`
    );

    const warningTip = "// 在最顶层引入 不可删除";

    const helpImport = `
import "./helpers/runtime.js";
import "./helpers/helpers.js";
`;

    const appTsPath = path.resolve(outPath, "app.ts"),
        appJsPath = path.resolve(outPath, "app.js"),
        appPath = appTsPath || appJsPath;
    fs.readFile(appPath, (err, data) => {
        if (err) {
            return err;
        }

        const text = data.toString();

        if (text.trim().includes(helpImport.trim())) {
            return;
        }
        fs.writeFile(
            appPath,
            warningTip + helpImport + "\n" + data.toString(),
            (err1) => {
                if (err1) {
                    return err1;
                }
                normalLog("> helpers 和 regeneratorRuntime生成成功");
            }
        );
    });
};
