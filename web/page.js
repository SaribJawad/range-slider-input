const STATE = require('STATE')
const statedb = STATE(__filename)
const { sdb } = statedb(defaults)

const example = require('../src')

const subs = sdb.watch(onbatch)
const [{ sid }] = subs
const element = example({ sid })
document.body.append(element)

function onbatch (batch) {
  /* @TODO: handle updates */
}
function defaults () {
  return { _: { '..': { $: '', 0: override } } }
  function override ([example]) {
    const data = example()
    // @TODO: maybe customize `data` if you want
    return data
  }
}
