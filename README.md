### 小程序CLI

> 一些问题

1. typescript配置的alias不会编译成相应地址，需要配合 [module-alias](https://github.com/ilearnio/module-alias) 在js中解析alias
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