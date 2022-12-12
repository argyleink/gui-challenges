import {SpringPhysics} from '/spring-physics.js'

const track = document.querySelector('.track')
const ball = document.querySelector('.ball')
const distance = track.clientWidth - ball.clientWidth - 40
const state = {pos: 0}

const init = () => {
  ball.physics = new SpringPhysics({
    startAt: state.pos, 
    options: {
      namespace: '--x',
      mass: mass.value,
      tension: tension.value,
      friction: friction.value,
      start_velocity: start_velocity.value,
    }, 
    update: ({namespace, value}) => {
      ball.style.setProperty(namespace, value.toFixed()+'px')
    }
  })
}

init()

document.querySelector('fieldset').onchange = () => {
  mass_value.textContent = mass.value
  tension_value.textContent = tension.value
  friction_value.textContent = friction.value
  start_velocity_value.textContent = start_velocity.value
  init()
}

track.addEventListener('click', e => {
  state.pos = distance === state.pos
    ? 0
    : distance

  ball.physics.to(state.pos)
})
