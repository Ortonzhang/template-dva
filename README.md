# dva-quick-cms


> 基于dva和ant.design框架快速开发cms项目


**开发前请仔细阅读[react基础汇总](http://192.168.49.104/fe-docs/docs/tutorial/react_dva.html)**


## 目录结构
```
  ├── mock                           mock数据配置
  │   ├── .gitkeep                   
  ├── node_modules                   npm依赖包
  ├── public                         入口页面
  │   ├── index.html                 index页面
  ├── src                            项目源码目录    
  │   ├── index.js                         入口js文件
  │   ├── index.scss                       公共样式
  │   ├── components                      公共纯组件目录
  │   │   └── loaiding.js                loaiding组件
  │   ├── models                         models
  │   │   └── app.js                     某一组件的model
  │   ├── utils                         公共js 可以存放工具函数等
  │   │   └── config.js               全局配置
  │   │   └── request.js              请求函数
  │   ├── images                         图片
  │   │       └── logo.png
  │   ├── server                         请求相关
  │   │   └── index.js                   全部请求
  │   ├── routes                         页面目录
  │   │   └── layout                     布局
  │   │        └── index.js              布局页面
  │   │        └── index.scss            布局样式
  │   └── router.js                     路由配置
  ├── .editorconfig                   代码格式
  ├── .eslintrc                       eslint配置
  ├── .gitignore                      git上传忽略配置
  ├── .roadhogrc.mock.js              roadhog配置
  ├── .webpackrc.js                   webpack额外配置
  ├── README.md                       项目说明
  ├── package-lock.json               npm install自动生成 记录package的具体来源和版本号
  ├── package.json                    项目所有配置和npm依赖项
```
