const elements = document.querySelectorAll('.gui-switch')
const switches = new Map()

const state = {
  activethumb: null,
}

const dragInit = event => {
  state.activethumb = event.target
  event.target.addEventListener('pointermove', dragging)
}

const dragging = event => {
  if (!state.activethumb) return

  let swx = switches.get(state.activethumb.closest('.gui-switch'))
  let pos = event.offsetX - swx.thumbsize / 2

  if (pos < swx.bounds.lower) pos = 0
  if (pos > swx.bounds.upper) pos = swx.bounds.upper

  state.activethumb.style.setProperty('--thumb-transition-duration', '0s')
  state.activethumb.style.setProperty('--thumb-position', `${pos}px`)
}

const dragEnd = event => {
  if (!state.activethumb) return

  state.activethumb.style.removeProperty('--thumb-position')
  state.activethumb.style.removeProperty('--thumb-transition-duration')
  state.activethumb.removeEventListener('pointermove', dragging)
  state.activethumb = null
}

const getStyle = (element, prop) => {
  return parseInt(
    window.getComputedStyle(element)
      .getPropertyValue(prop)
  )
}

const getPseudoStyle = (element, prop) => {
  return parseInt(
    window.getComputedStyle(element, ':before')
      .getPropertyValue(prop)
  )
}

elements.forEach(sx => {
  sx.addEventListener('pointerdown', dragInit)
  sx.addEventListener('pointerup', dragEnd)

  let checkbox = sx.querySelector('input')

  let thumbsize = getPseudoStyle(checkbox, 'width')
  let padding = getStyle(checkbox, 'padding-left') + getStyle(checkbox, 'padding-right')

  switches.set(sx, {
    thumbsize,
    padding,
    bounds: {
      lower: 0,
      middle: (checkbox.clientWidth - padding) / 4,
      upper: checkbox.clientWidth - thumbsize - padding,
    },
  })
})

window.addEventListener('pointerup', event => {
  if (!state.activethumb) return

  let sx = switches.get(state.activethumb.parentElement)

  let curpos = parseInt(
    state.activethumb.style.getPropertyValue('--thumb-position')
  )

  if (curpos >= sx.bounds.middle) 
    state.activethumb.checked = true

  dragEnd(event)
})