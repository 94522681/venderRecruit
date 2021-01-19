# 兴盛优选商城

### 项目运行
1. 先拉取项目依赖
```
npm i 或 yarn
```
2. 运行项目
```
npm run dev:weapp
```
3. 将项目根目录下的dist文件导入微信小程序开发工具


### 项目结构介绍

```
├── config            配置目录
|    ├── dev.ts       开发时配置
|    ├── index.ts     默认配置
|    └── prod.ts      打包时配置
├—— dist              编译后输出文件
├—— src
|    ├─── adapter             适配器
     |     ├─── components    组件适配器，如多端map组件等
|    |     ├─── api           api适配器，如getLocaltion等
|    ├─── api                 项目api
|    |     ├─── config        各端 api baseUrl 配置
|    |     ├─── mock          api mock数据
|    |     ├─── modal         api定义文件
|    |     └─── index.ts      请求封装函数
|    |─── assets              项目静态资源
|    |─── components          项目公共组件
|    |─── config              项目配置
|    |     ├─── env.ts        小程序环境
|    |     ├─── eventKeys.ts  Event Bus key 哈希表
|    |     ├─── index.js
|    |     └─── localStoragegKeys.ts   localStorage key 哈希表
|    ├─── pages    页面
|    ├─── store    状态管理
|    └─── utils    项目公共函数
├——  app.config.ts   小程序app配置文件
├——  app.ts          项目入口文件
├——  app.less        项目总通用样式
├——  index.html
└──  package.json
```

### 项目使用就近原则
1. 如页面文件创建（静态资源考虑以后可能传入云端，所以不考虑就近）
```
  |─── pages             页面
  | └─── components      页面公共组件
  |  |─── utils          页面公共方法
  |  └─── config         页面公共配置
  |—— index.config.ts    页面配置
  └── index.tsx          项目页面
```