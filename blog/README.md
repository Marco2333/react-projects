## Marco的个人博客

### 技术栈

```
react + redux + react-router + ES6/7 + webpack + express
```

### 演示地址
__[Marco的个人博客](http://www.hanyuehui.site)__


## Usage

### 安装
```
git clone https://github.com/Marco2333/react-projects.git

cd react-projects/blog

npm install
```

#### 开发模式：
```
webpack --config .\dll.config.dev.js

npm run dev
```

#### 产品模式：
```
webpack --config .\dll.config.prod.js

npm run build
```

在public/index.html中引入正确的`bundle.js`和`lib.js`。