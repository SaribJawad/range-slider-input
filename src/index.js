const STATE = require('STATE')
const statedb = STATE(__filename)
const { sdb, get } = statedb(fallback_module)
// sdb => don't pick customization from fallback_instance
// usefull when not using per-instance customization, and you want to use shared/static data from fallback_module.

const range_slider = require('@saribj/range-slider-demo')
const input_integer = require('@saribj/input-integer-ui-demo')

const imports = {
  range_slider,
  input_integer
}

module.exports = range_slider_integer

// always starts with async and opt parameter
async function range_slider_integer (opts) {
  const {
    id,
    // current id of this component instance
    sdb
    // the state DB tied to this instance used to get/set values like styles, configs, and even runtime state.
  } = await get(opts.sid)
  // required when using fallback_instance

  //   const drive = sdb.drive({ type: "text" });
  //   const text = drive.get("title.json");
  //   const el = document.createElement("div");
  //   el.innerHTML = `<h1> ${text} </h1>`;
  const el = document.createElement('div')
  const shadow = el.attachShadow({ mode: 'closed' })
  shadow.innerHTML = `
  <div class="action-bar-container">
    <div class="action-bar-content">
      <button class="icon-button"></button>
      <placeholder></placeholder>
    </div>
  </div>`

  const subs = await sdb.watch(onbatch)
  range_slider(subs[0]).then((el) =>
    shadow.querySelector('placeholder').replaceWith(el)
  )

  return el

  function onbatch (batch) {
    for (const { type, data } of batch) {
      on[type] && on[type](data)
    }
    // here we can create some elements after storing data
  }
}

function fallback_module () {
  // contains 3 keys parts
  // _:{}
  // defines submodules, only exist when using submodules

  // drive:{}
  // A place to store data to be saved in localStorage

  // api: { fallback_instance() }
  // any one using component can override default data here

  const names = ['@saribj/range-slider-demo', '@saribj/input-integer-ui-demo']
  const subs = {}
  names.forEach(subgen)
  subs['@saribj/range-slider-demo'] = {
    $: '', // only in here module not in instance
    0: '',
    mapping: { style: 'style' }
  }

  //   return { drive: {}, api, _: {} };

  return {
    _: subs, // Which submodules you're using and how you want to configure or override them.
    drive: {
      'style/': {}
    }
  }


  function subgen (name) {
    subs[name] = {
      $: '',
      0: '',
      mapping: {
        style: 'style'
      }
    }
  }

  function fallback_instance () {
    // fallback for each instance (if we have multiple)
    return { drive: {}, _: {} } // called for each new instance
  }
}
