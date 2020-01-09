# 在线考试平台 - 前端

## 新手引入

`Version1: Edited in 2020-01-09`

### 学会使用 Git 克隆本项目

如果你还没有 Git 工具，请先 [点击此链接](https://git-scm.com/) 到 Git 官方网站下载。

Git 是一个很方便的命令行工具「意思就是只能在黑框框 CMD 里运行，没有图形界面」，它的作用是
方便你管理自己编写代码的版本。

下载完成之后，打开该安装包，**除了选择软件的安装位置以外，其余的一路点击 Next 即可完成安装。**

- 如果你是 Windows 用户：请同时按下 Win + R 键呼出「运行」，然后输入 `cmd` 点击确定，打开`命令提示符`
- 如果你是 Mac OS 用户：请同时按下 Command + R 键呼出「聚焦搜索」，输入 `Terminal.app` （应该会有自动提示）打开终端

打开后应该会是在你的用户文件夹下：
- Windows 中是：`C:\Users\你的用户名`
- Mac OS 中是：`~` 即 `/Users/你的用户名`

以后我们统称这个玩意儿：**「黑框框」**

不如就在这里克隆本项目吧！输入下面的指令，执行项目的克隆：
```bash
git clone https://github.com/rpz-github-organization/Online-Exam-Platform-FE.git
```

耐心等待，到了又回到闪着光标时就说明克隆完成了。

### 做前端必须要有 Node 和 NPM

如果你还没有 Node 环境，请先 [点击此链接](http://nodejs.cn/download/) 去 Node.js 中文网下载。
记得按照自己对应的操作系统选择哦！

下载完成之后，打开该安装包，**除了选择软件的安装位置以外，其余的一路点击 Next 即可完成安装。**

然后同样打开 **黑框框** 输入：
```bash
node -v
```
应该会显示出你当前安装的 Node.js 版本：
```bash
v12.14.1
```
再输入以下命令，查看你的 NPM「Node.js Package Manager」的版本号：
```bash
npm -v # 此处敲回车
# 应该会显示出类似以下内容：
6.13.4
```
因为「墙」的缘故，导致国内 NPM 用户连接速度缓慢，故我们需要给 `npm` 更换一个国内的安装源：
```bash
npm config set registry https://registry.npm.taobao.org
```
大功告成啦！之后安装 NPM 上的包时就会快到飞起啦！

#### 「问题：这俩东西都是啥？为啥要安装他们？」

还记得学过的 Python 语言是怎么运行的么？是在你的 `code.py` 文件编写完成之后，在黑框框下，
使用 `python code.py` 来运行的。

对于 JavaScript 这门语言来说也是同样的道理，Node 就是它的那个 "运行器"。JS 过去是一个 "很残废"
的语言，**曾经只能由浏览器来解释和运行**，而随后微软和谷歌两家公司都做出了自己的 JS 引擎，分别是 `JScirpt` 和 `Node.js`，通过这么多年的竞争最后业界还是选择了 Node.js，并在此之上补充了一系列的新功能、新特性。

你一定在「计算机导论」课程的 python 实践课中使用过 `pip install` 来安装各种各样强大的 **「第三方包」**，这些都是这门语言的大佬们编写出来的 "通用库"，供给广大程序员使用。几乎每一门现代的编程语言都有自己的 **「包管理工具」**，当然 JavaScript 也不例外。

在之后讲到 `axios` 这个库时，我们会带你走过一次完整的 NPM包安装过程。

### 学会使用 Visual Studio Code 来编写代码

如果你还没有安装过 Visual Studio Code，请 [点击此链接](https://code.visualstudio.com/) 到官网下载即可。

这一次安装的时候可能需要你自己判断一些配置选项了，也许需要一些英文功底，如果实在看不懂就按照默认配置来吧！

**「在 Windows 下请注意：」我们强烈建议你勾选：在右键菜单中添加 "用 Visual Studio Code 打开" 这一项**，会极大方便之后使用，可以迅速开始编写代码。

强烈建议：安装完成之后，打开 Visual Studio Code，点击菜单栏中的「文件」，找到「自动保存」，点击开启。

#### 安装必要插件

**如何安装插件？看下图你就明白了：**

<img width="300" src="http://rpzoss.oss-cn-chengdu.aliyuncs.com/tmyBlog/2020-01-09-4951C9E4-8944-49F8-844F-759E73AF04D5.png">

我们推荐的插件如下：
- **Vetur** 用于 Vue 的相关开发
- **Auto Close Tag** 用于自动填补 HTML 的 </> 闭合标签
- **Auto Import** 在你输入文件路径时的智能提示
- **Auto Rename Tag** 如`<h1>Hello</h1>` 你修改前面的标签为 `<h2>`，那么后面会自动更改
- **Chinese (Simplified) Language Pack for Visual Studio Code** 中文语言包
- **Code Runner** 使你能立即运行大部分语言的代码
- **ESLint** JavaScript 的语言基础工具
- **Import Cost** 引入包时计算其体积
- **IntelliSense for CSS class names in HTML** 在 HTML 中智能提示 CSS 的类名
- **Live Server** 能够快速启动一个小型 Web 热重载服务器，供程序员边看边调试
- **vscode-icons** 让你的左侧文件树列表上的图标变得好看起来！
- **Path Intellisense** 在你输入 `./` 时给你目录中所含文件的智能提示

除此之外，再自己探索吧！以后你会慢慢体会到，Visual Studio Code 会是「最棒的前端编程工具」

### 项目文件结构

```bash
├── README.md                       # [*] 说明文档
├── babel.config.js                 # [x] Babel 配置文件
├── docs                            # [*] / Vue 项目：文档文件夹 /
├── jest.config.js                  # [x] Jest  配置文件
├── package.json                    # [*] 当前项目 NPM 配置
├── public                          #     / Vue 项目：公用文件夹 /
│   ├── favicon.ico                 # [*] 在浏览器标签卡上显示的图标
│   └── index.html                  # [*] 做基础承载的 HTML
├── src                             #     / Vue 项目：源代码文件夹 /
│   ├── App.vue                     # [*] Vue 模板节点树的 根组件
│   ├── assets                      #     / Vue 项目：资源文件夹 /
│   │   └── logo.png                    
│   ├── components                  #     / Vue 项目：组件源码文件夹 /
│   │   └── Login.vue               # [*] 实现登录的组件
│   ├── main.js                     # [*] JavaScript 入口文件
│   ├── router                      # [x] / Vue-Router 文件夹 /
│   │   └── index.js
│   ├── store                       # [x] / Vuex 文件夹 /
│   │   └── index.js
│   └── views                       # [*] / Vue 项目：页面视图文件夹 /
│       ├── About.vue               # [*] 「关于我们」页面视图组件
│       └── Home.vue                # [*] 「主页」   页面视图组件
├── tests                           # [x] Vue 单元测试文件夹
│   └── unit
│       └── example.spec.js
└── yarn.lock                       # [x] Yarn 包管理工具配置文件（自动生成）
```

上面的文件树中，打上了 `[*]` 符号的就是你需要掌握的内容，本指引会带着你一步步熟悉这个项目是怎么写出来的，不要畏惧，一步步看下去吧！

而对于上面打了 `[x]` 符号的就是暂时你学了也没用的内容，算是学长学姐们的忠告提醒啦 ...

### 先看看效果

用 Visual Studio Code 打开本项目，然后按 `Win: Ctrl + J` | `Mac: Command + J` 呼出终端。

输入以下命令开启 「开发服务器」：
```bash
npm run serve
```
等待显示出类似如下内容：
```bash
[DONE] Compiled successfully in 75ms

  App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.0.8:8080/
```

打开 **「建议是 Chrome/FireFox」** 你的浏览器，在地址栏输入：`http://localhost:8080/` 就可以看到页面啦！

当然由于登录这个功能需要后端支持，帐号密码什么的都需要存在数据库中，所以暂时只有前端的功能演示，之后我们会一步步补齐哒！

### 理解组织关系

有些同学可能会说：「啊！我 HTML 和 CSS 都没有学熟练，这个 Vue 项目我要如何开始学习呐？」

第一步自然应该是厘清项目中文件间组织关系。


> 当前阶段是 "项目起始架构"，要回到此步骤：请回溯到： 
> 
> **`「commit: 10cee2e3dd65259e0ead30e9c0283a721afe85c8」`**

#### 这些 .vue 文件是怎么组织起来的？

<img width="700" src="http://rpzoss.oss-cn-chengdu.aliyuncs.com/tmyBlog/2020-01-09-1C149988-8CE1-49E6-8AE6-97E48AA8B7B7.png">

从上图你可以看出，这一切还是要基于一个 HTML 的文件。点开 `public/index.html`，你会看到 `body` 中只有一个什么内容都没有的 `div` 元素，却能够展示出浏览器当中呈现出的效果：
```html
<div id="app"></div>
```
这是由于 Vue 在编译过程中用 `src/App.vue` 内 `<template> ... </template>` 内的 HTML 替换掉原来此处的这个元素。

**每一个 `.vue` 文件就是一个「组件」**，只是各个组件的意义可能不尽相同。比如 `App.vue` 可能只是作为一个树根，而 `Home。vue` 和 `About.vue`

打开 Chrome 浏览器的开发者工具：`Windows: Ctrl + Shift + I`|`Mac: Option + Command + I`，这个东西以后我们会经常用到。

![](http://rpzoss.oss-cn-chengdu.aliyuncs.com/tmyBlog/2020-01-09-WeChat9fca497b248ea1c84a6cbdbb9e538af4.png)

可以看到原本空空如也的 `<div id="app"></div>` 现在里面多了这么多元素。

总结以上经历：在 `.vue` 文件中的 `<template></template>` 书写 HTML 和在 `index.html` 中并没有什么区别。

只是因为 Vue 框架提供的功能，原本一个 HTML 文件中的大元素，可以将内容拆到好几个 `.vue` 文件中了。
当我们点开 `App.vue`，可以看到：
```html
<div id="app">
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</div>
```
`<router-link>` 和 `<router-view>` 是 Vue-Router 插件提供的组件，它并不是 HTML 原生的标签。

如果你细心观察会发现：**其实`<router-link>` 就是一个 `a` 标签**，属性 `to` 其实就是 `a` 标签上的 `href`。

而 `<router-view>` 中负责展示对应的路由：比如地址 `http://localhost:8080/about` 对应的就应该是 `src/views/About.vue`，这些控制对应关系的定义需要写在 `src/router/index.js` 中。

这些就涉及到 Vue-Router 的内容了，我们不再做深入展开。

> 到此处有一次提交，若要回退到此，请回溯到：
> 
> `commit 0a7a019fbcd5d909f92d14024177dabffd057fd6`

#### 开始编写登录表单的界面

既然在上面咱们画出了组件间的关系图，那么你应该能够理解「**一种业务逻辑应该写在专门的组件里**」这句话了吧！比如咱们的登录页面就应该写在 `Login.vue` 中。

众所周知，登录时是需要输入的，常见的字段有 "手机号"、"用户名"、"邮箱地址" 等，然后是输入密码，或是较现代一些的 "使用短信验证码" 登录。**根据需求，我们就采用两个字段：学号/工号 和 密码**。

> 若要恢复到「登录界面」编写完成的提交，请回溯到：
> 
> `commit: fa67d62abd2ab2985baa48d691f7d0e4e17a7765`

制作界面的过程中主要是一些 CSS 的问题，说明一下：

- 如果你已经有了一些 CSS 的经历，你会发现我们写的 `<style>` 里的格式很奇怪：
  那是因为我们使用了 `less` 这个高级 CSS 工具，**你暂时并不需要知道这东西是怎么配置的，
  先学习它是怎么用的吧！**

  比如对于 `.card` 和 `.card` 中的 `.title`, 根据选择器原理你最好应该这么分开写：
  ```css
  .card {
    /* .card styles here ... */
  }
  .card .title {
    /* .title styles here ... */
  }
  ```
  但是在 `less` 中你大可不必这么做，各个 `div` 之间的关系就是 CSS 类之间的关系。
  ```less
  .card {
    /* .card styles here ... */

    .title {
      /* .title styles here ... */
    }
  }
  ```

- 我们采用了 **Flex 布局** 这种容易上手的模式来编写界面，我推荐你到 [菜鸟教程](https://www.runoob.com/w3cnote/flex-grammar.html) 学习，这篇教程讲的很好，读完之后练一练，你会发现布局原来很简单！
  
  选择 Flex 的理由是，你不用了解很多 CSS 的 "古老写法"，它的写法、用法都比较独立。

至此我们还没有开始涉及到 JavaScript 中的内容，还没有开始「**操作数据**」，而接下来我们就将走进 JavaScript 的部分啦！

#### 让数据在页面中生效

