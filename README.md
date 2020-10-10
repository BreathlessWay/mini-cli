### 小程序 CLI

> 使用

1. 安装 `npm i breathlessway_mini_cli -g`
2. 命令
    - `mini -h`: 帮助
    - `mini -v`: 版本
    - `mini -i <name>`: 创建项目

> 一些问题

1. typescript 配置的 alias 不会编译成相应地址，需要配合 [module-alias](https://github.com/ilearnio/module-alias) 在 js 中解析 alias

```
// tsconfig.json中添加
"baseUrl": "./",
"paths": {
     "@/*": [
       "src/*" // 为入口目录
     ]
},

// package.json中添加
"_moduleAliases": {
    "@": "dist" // 为输出目录
},

// src/index.ts入口文件添加
import 'module-alias/register';
```

2. [standard-version](https://github.com/conventional-changelog/standard-version) 配合 [commitlint](https://github.com/conventional-changelog/commitlint) 生成版本 CHANGELOG.md
