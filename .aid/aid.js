var path = require('path')
let {
  join
} = require('path')

function rules(config) {
  let rules = config.module.rules.map(v => {
    if(v.test.toString() === '/\\.css/') {
      return {
        test: /\.css/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')]
      }
    }
    if(v.test.toString() === '/\\.(ttf|eot|svg|otf)(\\?v=[0-9]\\.[0-9]\\.[0-9])?$/') {
      return {
        test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        exclude: path.resolve(__dirname, '../src/components/icon/svg'), // 不带icon 玩
      }
    }
    return v
  })
  rules.push(
    {
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
      include: [path.resolve(__dirname, '../src/components/icon/svg')],
      options: {
        symbolId: 'icon-[name]'
      }
    }
  )
  console.log(rules)
  return {
    module: {
      rules
    }
  }
}
module.exports = {
  type: "frontend", // 项目类型
  spa: '/index.html', //是否单页应用,url rewrites 规则
  jsExt: ".js", //入口js文件后缀名
  cssExt: ".scss", //入口css文件后缀名
  autocheck: ['aid-elements', 'aid-taurus-desktop'],
  strict: false,
  beforeDev(config) {
    return rules(config)
  },
  beforeBuild(config) {
    let result = rules(config)
    result.output = {
      publicPath: '/'
    }
    return result
  },
  outputPrefix: '/' // 构建后index.html中资源路径的前缀
}
