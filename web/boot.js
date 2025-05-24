// no need to understand this file (just copy/paste it for now)
const hash = '895579bb57e5c57fc66e031377cba6c73a313703'
const prefix =
  'https://raw.githubusercontent.com/alyhxn/playproject/' + hash + '/'
const init_url =
  'https://raw.githubusercontent.com/alyhxn/playproject/' +
  hash +
  '/doc/state/example/init.js'
const args = arguments

fetch(init_url, { cache: 'no-store' })
  .then((res) => res.text())
  .then(async (source) => {
    const module = { exports: {} }
    console.log('asd')

    const f = new Function('module', 'require', source)
    f(module, require)
    const init = module.exports
    await init(args, prefix)
    require('./page')
  })
