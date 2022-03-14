const progress = document.querySelector('progress')
const zone     = document.querySelector('#loading-zone')

const state = {
  val: .1
}

const roundDecimals = (val, places) =>
  +(Math.round(val + "e+" + places)  + "e-" + places)

const setProgress = () => {
  // set loading zone status
  zone.setAttribute('aria-busy', state.val < 1)

  // clear attributes if no value to show
  // <progress> will show indeterminate state
  if (state.val === null) {
    progress.removeAttribute('aria-valuenow')
    progress.removeAttribute('value')
    progress.focus()
    return
  }

  // round bad JS decimal math
  const val = roundDecimals(state.val, 2)
  const valPercent = val * 100 + "%"
  
  // set value for screenreaders and element values
  progress.value = val
  progress.setAttribute('aria-valuenow', valPercent)
  progress.innerText = valPercent

  // focus so screenreaders hear the announced value update
  progress.focus()
}

// on page load simulate partial completion
setTimeout(_ => setProgress(), 2000)
setTimeout(_ => {
  state.val = .4
  setProgress()
}, 4000)
setTimeout(_ => {
  state.val = .6
  setProgress()
}, 5000)
setTimeout(_ => {
  state.val = .9
  setProgress()
}, 6000)
setTimeout(_ => {
  state.val = 1
  setProgress()
}, 8000)

// DEMO EVENTS
window.increase = e => {
  state.val += .2
  
  if (state.val > 1)
    state.val = 1
  
  setProgress()
}

window.decrease = e => {
  state.val -= .2
  
  if (state.val < 0)
    state.val = 0
  
  setProgress()
}

window.complete = e => {
  state.val = 1
  setProgress()
}

window.reset = e => {
  state.val = null
  setProgress()
}
