import shelljs from "shelljs";
import path from "path";

import config from "./config";

if (config.cliPath) {
    const pwd = path.resolve();

    const cmd = `${config.cliPath} build-npm --project ${pwd}`;

    shelljs.exec(cmd, (code, stdout, stderr) => {
        console.log("buildNpm Exit code:", code);
        console.log("buildNpm stdout:", stdout);
        console.log("buildNpm stderr:", stderr);
    });
}
