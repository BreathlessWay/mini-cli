import shelljs from "shelljs";
import fs from "fs";

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

const helpRootPath = "helpers";

const helperPath = `${helpRootPath}/index.js`,
    runtimePath = `${helpRootPath}/runtime.js`;

shelljs.mkdir(`src/${helpRootPath}`);

shelljs.exec(
    `babel-external-helpers -t global -l ${helpersWhiteList} > src/${helperPath}`,
    (code, stdout, stderr) => {
        console.log("babel-external-helpers Exit code:", code);
        console.log("babel-external-helpers stdout:", stdout);
        console.log("babel-external-helpers stderr:", stderr);
    }
);

shelljs.cp(
    "-f",
    "node_modules/regenerator-runtime/runtime.js",
    `src/${runtimePath}`
);

const warningTip = "// 在最顶层引入 不可删除";

const helpImport = `
import "./${runtimePath}"
import "./${helperPath}"
`;

fs.readFile("src/app.ts", (err, data) => {
    if (err) {
        return err;
    }

    const text = data.toString();
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
