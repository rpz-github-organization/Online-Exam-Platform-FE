# 在线考试平台 - 前端

## 新手引入

`Version1: Edited From 2020-01-09`

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

#### 如果教程更新了，我本地怎么同步？

打开黑框框，将目录切换到本项目的文件夹中，输入以下命令：

```bash
git pull origin master
```

然后你就会看到一些文件名后面出现了 `+` 和 `-` ，表示它们经过了一些改动，等待又恢复到闪烁状态说明更新完成。

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

1. 输入以下命令「**安装依赖**」：
```bash
npm install
```

2. 输入以下命令「**开启开发服务器**」：
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

### 开始编写登录表单的界面

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

### 让数据在页面中生效

**前置知识：** JavaScript 可以通过 `<input />` 这个 HTML 元素的 `value` 属性获取到输入的值。

> 做个实验吧！打开 Chrome 的开发者工具，切换到 `Console` 页，在`>`处输入以下 JS 代码：
> 
> ![](http://rpzoss.oss-cn-chengdu.aliyuncs.com/tmyBlog/2020-01-10-327035C5-EA8B-4EF6-AF77-35E8997574F1.png)
> 

- 如果要在 Vue 的组件中 **存储数据**，必须先定义一个变量作为数据的"容器"。
  
  ```js
  export default {
    data() {
      return {
        uid: '',
        password: '',
      };
    },
  }
  ```

  **问题：data 为什么必须是一个函数？** 💁🏻请 [点击这里](https://cn.vuejs.org/v2/guide/components.html#data-%E5%BF%85%E9%A1%BB%E6%98%AF%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0) 寻找答案！

- Vue 当中对于 `value` 值的获取有更方便的办法：在`<input />`使用「指令」`v-model`：
  
  ```html
  <input v-model="uid" type="text" name="uid" placeholder="请输入你的学号或工号" />
  ```

  此处填写在 `v-model` 的 `uid` 就是你在 `data()` 中定义的"容器"。如果你对这个指令的用法有疑问，请 [点击这里](https://cn.vuejs.org/v2/guide/forms.html) 查看「输入绑定」的相关介绍。

#### 安装和使用 Vue DevTools

为了能即时地查看 Vue 组件中的数据，Vue 官方推出了一个 Chrome 浏览器的插件。

[点击这个百度云链接](https://pan.baidu.com/s/139hspAnspD7bJbo81xigmg)，密码是: `1hsv`

下载好后你会得到 `vue-devtools.crx` ，在 Chrome 浏览器地址栏输入：`chrome://extensions/`，进入扩展程序页面，**一定要记得打开右上角的「开发者模式」**，然后把 `.crx` 文件拖进来安装即可。

![](http://rpzoss.oss-cn-chengdu.aliyuncs.com/tmyBlog/2020-01-10-47443316-ACB1-421A-8FD2-EDA5CCC3269C.png)

然后回到我们的 `http://localhost:8080/`，打开 Chrome 开发者工具，找到 `Vue` 标签卡，如果前面几个中没有，就点击最后的 `>>` 按钮在下拉菜单中。然后依次展开「组件树」，类似如下的图：

![](http://rpzoss.oss-cn-chengdu.aliyuncs.com/tmyBlog/2020-01-10-D192D68C-BE0B-4038-9850-EA945CAD2056.png)

不要关闭开发者工具，在输入框中试着输入学号和密码，你会看到右边 Vue DevTools 中数据响应式地发生着变化。

现在你已经实践了如何通过 Vue 来获取数据，接下来我们将要学习如何向后端服务器发送数据。

> 若要恢复到教程的此处，请回溯到：
> 
> `commit: 1a5e47222ded593e7d9207e6c328690dde8b581c`

### 与后端实现通信交互

#### 安装发请求的工具

每天淘宝网都会有许许多多的订单发生，用户打开商品详情页面，选择好款式下单付钱，这一切的行为都是在客户端，也就是我们口中说的「前端」操作的，而这背后，在阿里巴巴的服务器，也就是「后端」里中，还发生了许许多多顾客不可见的过程，而这一切都是通过「**网络 HTTP 请求**」实现的。

所谓前端后端，也就是「离你更近的、你面前的电脑」与「为网站能运转而架设的服务器，它同样也是一台电脑，只不过 CPU 更多，内存、硬盘更大，性能更强而已。」

在我们的登录功能中，用户输入完帐号密码后，是怎么把这两条字符串发送给服务器的呢？答案是：用一条 **HTTP 协议** 格式的报文。

要发送出这样一条报文，NPM 的丰富资源让我们有许多库可以用来做这件事，而目前 Vue 社区最流行的就是 `axios`，下面我就带着你来一步步安装这个库：

首先确保你的 "黑框框" 切换到这个项目文件夹中，然后执行:
```bash
npm install --save axios

# 知道最后要出现类似以下代码，才算成功哟：
+ axios@0.19.1
added 53 packages from 37 contributors, removed 33 packages and updated 1367 packages in 68.978s
```

找到 `src/main.js` 这个文件，打开后你需要像写 Python 时那样（**甚至语法都相似！**）引入我们需要的包，并且要让它成为 Vue 对象原型中的一个方法。你可能还不能理解所谓 `原型` 是什么，别着急，先记下这个名词，今后你会再在其他更需要你理解它的地方遇到。

**一定要注意引入的顺序！**

你可能会遇到如下报错：
![](http://rpzoss.oss-cn-chengdu.aliyuncs.com/tmyBlog/2020-01-10-E0D2A44C-435B-407E-9D6C-2D11C118C4B3.png)

**解决方法：**

把 `import axios from 'axios'`移到 `import App from './App.vue'` 之前。完整的代码应该如下所示：
```js
import Vue from 'vue';
import axios from 'axios';          // 引入 axios
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototye.$axios = axios;        // 挂载到原型

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
```

#### 在组件中发送请求

切换到 `Login.vue`，我们要开始使用一些 Vue 的其他特性功能了。

我们想要实现的功能是："点击「登录」按钮就会发送请求"，那么我们 **就需要给登录按钮绑定一个「方法」作为回调，来接收用户在页面上触发的点击事件**。

所谓「方法」，是一些「**定义在当前组件，可以在多处使用的 `function`**」，如果你还不熟悉怎么在 Vue 组件上定义 `methods`，请 [点击此链接](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95) 查看指引。

我们在 `data()` 的下方新加一个 `methods` 属性：
```js
methods: {
  async submitLogin() {
    
  },
},
```
`submitLogin` 翻译为中文就是"提交登录"，定义的方式和 JS 定义函数的语法是一样的！但是为什么前面要加一个 `async` 呢？

这是因为我们这个方法需要发送网络请求，**这很可能是一个耗时操作！**，所以我们倾向于将它做成「异步函数」，由于 Node.js 引擎 **非阻塞I/O** 的特性，所以不会卡住其他地方的代码执行。

当然你也听出来了，这是一个比较难的概念，如果你暂时不能理解，这好办，你就先记住，**每一个需要发送请求的函数都要写成如下的格式：**
```js
async 这里名字你自己取() {
  try {
    const res 
      = await this.$axios.HTTP方法名('请求地址',/*这里可能还有其他参数*/)
    
    /* 接下来是对拿到的返回结果 res 对象做解析 */
  } catch (err) {
    /* 这里是接收到了可能发生的错误 */
    console.log(err);  // 先在控制台打印出来看看是什么错误吧！
  }
}
```

由于此时还没有实际的后端服务，所以我们就先随便给一个请求地址比如：`http://localhost:8080/login` ，由于安全性的考虑我们需要使用 HTTP 的 `POST` 请求，如果你也想问「为什么POST请求相对GET请求更安全」请看我的博客此文：[如何做一次较为安全的登录](https://blog.shenqingchuan.top/archives/%E5%A6%82%E4%BD%95%E5%81%9A%E4%B8%80%E6%AC%A1%E8%BE%83%E4%B8%BA%E5%AE%89%E5%85%A8%E7%9A%84%E7%99%BB%E5%BD%95)，这其中有提到原因。

由于 axios 库的强大功能，使得我们可以只关注我们业务逻辑中的数据项，而不用过多在意 HTTP 报文的大部分内容该如何填写，axios 都帮我们默认做好了。

我们要关注的是 `POST` 请求的 `Request Body` 部分，HTTP 报文中的另一个字段 `Content Type` 可以设置 `Request Body` 的格式，在 JS 里我们最好使用 JSON 格式，以为这个格式本身就来源于 JS 的 Object 对象格式，我们只需要给 axios 的请求方法传入一个 JS Object 对象即可，示例如下：
```js
const res = await this.$axios.post('/login', {
  uid: this.uid,
  password: this.password,
});
```
看到这里你可能又有新的疑问了：这里的`this`是什么？

`this` 是 JS 的关键字，本来的定义是「指向它的直接调用者，即函数运行时所在的环境」，然而为了方便程序员们使用，Vue 利用 `this` 在 `()=>{}` 模式下可以被继承进下一层的特性，**使得在 Vue 组件中的 `this` 只要没有特殊情况，都指向该 Vue 组件**。

故而 `this.uid` 就是在 `data()` 函数中返回的对象中的那个 `uid`，`password` 也同理。

至此报文就写完啦！接下来就是把这个方法和 "登录按钮" 的**点击事件**绑定。

在登录按钮的 HTML 元素 `<button />` 上添加一个 Vue 的指令 `@click`，如果你对 `v-on` 这个指令不熟悉，请 [点击此链接]() 查看并预先学习，最后我们的结果应该是这样的：
```html
<button @click="submitLogin" class="submit">登录</button>
```

在前端想后端用 JS 发送请求的过程，学名叫做「**AJAX**」，是一种 "是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术"，要了解更多相关内容，请 [点击此链接](https://www.runoob.com/ajax/ajax-intro.html)
 查看相关教程。

#### 查看请求返回结果

打开 Chrome 的开发者工具，切换到 `Network` 标签页，这里是我们用来 **分析网络请求** 的地方。

点击这个按钮可以清除之前的所有请求记录，方便我们只查看我们创建的这一次：

![](http://rpzoss.oss-cn-chengdu.aliyuncs.com/tmyBlog/2020-01-10-WeChatb2101bf27cd633730559af7cb9712d48.png)

我们在输入框内填上测试的数据，然后尝试点击 "登录" 按钮后你会发现，右边多出了一个请求，我们可以看到这一则 HTTP 请求的详细报文信息：

![](http://rpzoss.oss-cn-chengdu.aliyuncs.com/tmyBlog/2020-01-10-WeChat91a19087963648687ecd12165c3bc9d4.png)

- 在最上方它写出了请求的 URL 也就是请求的网络地址
- 表明了它的 `Request Method` 是 `POST`
- 请求最终的结果是 `405 Method Not Allowed`，由于 `localhost:8080` 就是我们的前端页面挂载的地址，在这里我们并没有实际的后端服务，这个服务器只允许客户端 "GET" 页面，故而显示 "方法不允许" 的结果。
  
  如果你想了解更多 HTTP 的状态码，请 [点击此链接](https://www.runoob.com/http/http-status-codes.html) 了解详情。

- 在最下方你可以看到，我们的 `Request Payload` 请求中的"载荷"（这名词听着很玄乎其实就是传输的数据啦！）的确就是我们填写的两则数据字段 `uid` 和 `password`。

因为我们创建的这次请求是 "注定失败" 的，所以根据预想，程序应该会走到 `try/catch` 的「接收错误」的部分，在控制台经 `console.log()` 打印出错误：

![](http://rpzoss.oss-cn-chengdu.aliyuncs.com/tmyBlog/2020-01-10-WeChat7f258e16d0e7b7421aba9fdc8da84ae7.png)

等到后端服务建立至少一个 API 接口完成后，再补充如何解析真实 HTTP 返回结果吧！

#### 不要忘记总结此请求的数据格式

做后端的小哥哥小姐姐们要想和做前端的我们通力合作，就需要我们把我们发出的请求中的 JSON 数据格式描述清楚，并总结报告给他们。

（当然，这项工作有时候是后端的程序员们先将请求格式定义好告诉你，那咱们就照做即可）

如果你想学习如何书写接口文档，那么点击此链接请看本项目 [`docs/接口文档示范.md`](https://github.com/rpz-github-organization/Online-Exam-Platform-FE/blob/master/docs/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3%E7%A4%BA%E8%8C%83.md) 中的内容。
