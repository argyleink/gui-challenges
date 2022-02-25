const progress = document.querySelector('progress')
const increase = document.querySelector('#increase')
const decrease = document.querySelector('#decrease')
const complete = document.querySelector('#complete')
const reset    = document.querySelector('#reset')

const state = {
  val: .3
}

const setProgress = val => {
  if (val === null)
    return progress.removeAttribute('value')
  
  progress.value = val
  progress.innerText = val * 100 + "%"
}

setTimeout(_ => setProgress(state.val), 2000)

increase.addEventListener('click', e => {
  state.val += .2
  
  if (state.val > 1)
    state.val = 1
  
  setProgress(state.val)
})

decrease.addEventListener('click', e => {
  state.val -= .2
  
  if (state.val < 0)
    state.val = 0
  
  setProgress(state.val)
})

complete.addEventListener('click', e => {
  state.val = 1
  setProgress(state.val)
})

reset.addEventListener('click', e => {
  state.val = null
  setProgress(state.val)
})