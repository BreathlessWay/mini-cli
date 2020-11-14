import path from "path";

import shelljs from "shelljs";

import { normalLog } from "@/log";
import { isFileExist } from "@/utils";

export const generateHelpers = async ({ genPath }: { genPath?: string }) => {
    let outPath;
    if (genPath) {
        if (path.isAbsolute(genPath)) {
            outPath = genPath;
        } else {
            outPath = path.resolve(process.cwd(), genPath);
        }
    }
    if (!outPath || !(await isFileExist(outPath))) {
        throw Error(`> 文件目录${outPath}不存在`);
    }

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

    const helperPath = `${helpRootPath}/helpers.js`;

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
        `${helpRootPath}`
    );

    shelljs.cp("-Rf", path.resolve(__dirname, "../help.md"), `${helpRootPath}`);

    normalLog("> helpers 和 regeneratorRuntime生成成功，请在入口文件引入");
};
