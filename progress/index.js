const progress = document.querySelector('progress')
const increase = document.querySelector('#increase')
const decrease = document.querySelector('#decrease')
const complete = document.querySelector('#complete')
const reset    = document.querySelector('#reset')
const zone     = document.querySelector('#loading-zone')

const state = {
  val: .3
}

const setProgress = () => {
  // set loading zone status
  zone.setAttribute('aria-busy', state.val < 1)

  // clear attributes if no value to show
  // <progress> will show indeterminate state
  if (state.val === null) {
    progress.removeAttribute('aria-valuenow')
    progress.removeAttribute('value')
    return
  }

  // round bad JS decimal math
  const val = state.val.round(2)
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

// DEMO EVENTS
increase.addEventListener('click', e => {
  state.val += .2
  
  if (state.val > 1)
    state.val = 1
  
  setProgress()
})

decrease.addEventListener('click', e => {
  state.val -= .2
  
  if (state.val < 0)
    state.val = 0
  
  setProgress()
})

complete.addEventListener('click', e => {
  state.val = 1
  setProgress()
})

reset.addEventListener('click', e => {
  state.val = null
  setProgress()
})

Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}