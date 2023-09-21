const zoom = document.querySelector('focus-zoom')

const state = {}

const toggleSpotlight = show_effect => {
  if (show_effect) {
    zoom.style.setProperty('--top', `${state.top}px`)
    zoom.style.setProperty('--right', `${state.right}px`)
    zoom.style.setProperty('--bottom', `${state.bottom}px`)
    zoom.style.setProperty('--left', `${state.left}px`)
  } else {
    zoom.style.setProperty('--top', `0px`)
    zoom.style.setProperty('--right', `0px`)
    zoom.style.setProperty('--bottom', `0px`)
    zoom.style.setProperty('--left', `0px`)
  }
}

window.addEventListener('mouseover', e => {
  let { top, right, bottom, left } = e.target.getBoundingClientRect()
  
  state.top = top - 2
  state.right = window.innerWidth-right - 2
  state.bottom = window.innerHeight-bottom - 2
  state.left = left - 2
}) 

window.addEventListener('keydown', e =>
  toggleSpotlight(e.altKey))
window.addEventListener('keyup', e =>
  toggleSpotlight(e.altKey))
window.addEventListener('touchstart', e =>
  toggleSpotlight(true))
window.addEventListener('touchend', e =>
  toggleSpotlight(false))