import fs from "fs";
import path from "path";

import shelljs from "shelljs";

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
    shelljs.exec(
        `npx babel-external-helpers -t global -l ${helpersWhiteList} > ${helperPath}`,
        (code, stdout, stderr) => {
            console.log("babel-external-helpers Exit code:", code);
            console.log("babel-external-helpers stdout:", stdout);
            console.log("babel-external-helpers stderr:", stderr);
        }
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

    fs.readFile("src/app.ts", (err, data) => {
        if (err) {
            return err;
        }

        const text = data.toString();
        console.log(text.trim().includes(helpImport.trim()));
        if (text.trim().includes(helpImport.trim())) {
            return;
        }
        fs.writeFile(
            "src/app.ts",
            warningTip + helpImport + "\n" + data.toString(),
            (err1) => {
                if (err1) {
                    return err1;
                }
            }
        );
    });
};
