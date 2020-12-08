# 使用svg 图标示例工程

本工程基于aid-cli初始化工程。


## 包含四个部分
1. 配置 svg-sprite-loader 将svg文件合成svg 雪碧图
2. 配置 svgo-loader 优化 svg，并去除填充色,方便我们自定义颜色
3. require.context 一次引入所有文件
4. 组件化

### 配置 svg-sprite-loader

svg-sprite-loader 会把你的 svg 塞到一个个 symbol 中，合成一个大的 svg。
最后将这个大的 svg 放入 body 中。
symbol的id如果不特别指定，就是你的文件名。
在页面上形成这样的元素:

```html
<body>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="__SVG_SPRITE_NODE__">
      <symbol xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" id="xxx">
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" id="xxx">
      </symbol>
    </svg>
</body>
```

我们的每一个 icon 都对应着一个 symbol 元素，这个时候我们就可以在页面使用 svg use 啦。
```html
<svg>
  <use xlink:href="#xxx"/>
</svg>
```

```bash
#### 只作用于我们需要制作成图标的svg文件
rules.push(
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      }
    ],
    include: [path.resolve(__dirname, '../src/components/icon/svg')]
  }
```

### 配置 svgo-loader

使用 svgo-loader 优化我们的svg，以及去除fill填充色，方便我们自定义图标颜色

```bash
#### 只作用于我们需要制作成图标的svg文件
rules.push(
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            {removeTitle: true},
            {removeAttrs: {attrs: 'path:fill'}},
            {convertPathData: false}
          ]
        }
      }
    ],
    include: [path.resolve(__dirname, '../src/components/icon/svg')]
  }
```

### require.context 一次引入所有文件

`base
  const requireAll = requireContext => requireContext.keys().map(requireContext)
  const req = require.context('./svg', false, /\.svg$/)
  requireAll(req)
`

### icon组件化
最后，把icon组件化，方便项目使用。
`base
  <svg-icon :customer-styles="svgIconStyles" size="28px" color="red" icon="alert-circle" bg-color="primary" rotate="180"></svg-icon>
`


