# TodoList

## 前言
一个简单的todoList小项目，支持云端同步功能(需要注册账号并且登陆)，前端使用React框架和Antd组件库构建，后端使用SSM框架连接MySQL数据库，前后端分离的小项目

使用到的设计模式

- 对象传输模式
- 拦截过滤器模式
- MVC模式
- 控制反转模式
- 依赖注入模式

软件架构为

- 分层架构

## 技术栈

前端：react

后端：SSM框架

数据库：MySQL(8.0.28)

## 项目运行

**由于前端涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本**

下载项目

`git clone https://gitee.com/xiaohugitee/todo-list.git`

### 前端

```
cd todo-list/todo_page

npm i

npm run start

```

### 数据库

创建todo数据库，并运行根目录下的`todo.sql`文件创建表

### 后端

使用idea打开`todo_server`文件夹，打开项目的`pom`刷新下载项目所需依赖

安装`Maven Help`插件用来启动项目

<img src="https://gitee.com/xiaohugitee/todo-list/raw/master/pic/mavenhelp.png" alt="image-20221229161656137" style="zoom:50%;float:left" />

右键点击项目选择`run maven`,再选择`tomcat7:run`运行项目



## 部分截图

> 注意图片来源于github的图床，加载可能失败或者比较慢

<img src="https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202212291624352.png" alt="image-20221229162427138" style="zoom:50%;" />

<img src="https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202212291626101.png" alt="image-20221229162633065" style="zoom:50%;" />

<img src="https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202212291627183.png" alt="image-20221229162738126" style="zoom:50%;" />

> 后端对手机号和密码都进行了MD5加密之后存储到数据库，保证了信息的安全

<img src="https://raw.githubusercontent.com/redyouzi/images-for-blog/main/img02/202212291628096.png" alt="image-20221229162827045" style="zoom:50%;" />
