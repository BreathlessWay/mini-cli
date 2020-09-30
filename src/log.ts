import { colorConsole } from "tracer";

const log = colorConsole({
    format: [
        '{{message}}', //default format
        {
            // error:
            //     '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}' // error format
        }
    ],
});

export default log