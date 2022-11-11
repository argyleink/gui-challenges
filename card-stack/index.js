let stack = document.querySelector('.card-stack')

window.slider.oninput = e => {
  stack.style.setProperty('--scalar', e.target.value)
}