import $ from 'blingblingjs'

const progress = $('progress')
const increase = $('#increase')
const decrease = $('#decrease')
const complete = $('#complete')
const reset    = $('#reset')
const zone     = $('#loading-zone')

const state = {
  val: .3
}

const setProgress = () => {
  // set loading zone status
  zone.attr('aria-busy', state.val < 1)

  // clear attributes if no value to show
  // <progress> will show indeterminate state
  if (state.val === null) {
    progress.attr('aria-valuenow', null)
    progress.attr('value', null)
    return
  }

  // round bad JS decimal math
  const val = state.val.round(2)
  const valPercent = val * 100 + "%"
  
  // set value for screenreaders and element values
  progress[0].value = val
  progress.attr('aria-valuenow', valPercent)
  progress[0].innerText = valPercent

  // focus so screenreaders hear the announced value update
  progress[0].focus()
}

// on page load simulate partial completion
setTimeout(_ => setProgress(), 2000)

// DEMO EVENTS
increase.on('click', e => {
  state.val += .2
  
  if (state.val > 1)
    state.val = 1
  
  setProgress()
})

decrease.on('click', e => {
  state.val -= .2
  
  if (state.val < 0)
    state.val = 0
  
  setProgress()
})

complete.on('click', e => {
  state.val = 1
  setProgress()
})

reset.on('click', e => {
  state.val = null
  setProgress()
})

Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}