const switches = document.querySelectorAll('.gui-switch')

const state = {
  activethumb: null,
}

const dragging = event => {
  let thumbsize = getPseudoSize(state.activethumb, 'width')
  let lowerBoundary = 0
  let upperBoundary = state.activethumb.clientWidth - thumbsize - 4
  let pos = event.offsetX - thumbsize / 2

  if (pos < lowerBoundary) pos = 0
  if (pos > upperBoundary) pos = upperBoundary

  state.activethumb.style.setProperty('--thumb-transition-duration', '0s')
  state.activethumb.style.setProperty('--thumb-position', `${pos}px`)
}

const dragInit = event => {
  state.activethumb = event.target
  event.target.addEventListener('pointermove', dragging)
}

const dragEnd = event => {
  if (!state.activethumb) return

  let curpos = parseInt(state.activethumb.style.getPropertyValue('--thumb-position'))

  if (curpos >= 32)
    state.activethumb.checked = true

  state.activethumb.style.removeProperty('--thumb-position')
  state.activethumb.style.removeProperty('--thumb-transition-duration')
  state.activethumb.removeEventListener('pointermove', dragging)
  state.activethumb = null
}

const getPseudoSize = (element, prop) => {
  return parseInt(
    window.getComputedStyle(element, ':before')
      .getPropertyValue(prop)
  )
}

switches.forEach(s => {
  s.addEventListener('pointerdown', dragInit)
  s.addEventListener('pointerup', dragEnd)
})

window.addEventListener('pointerup', dragEnd)