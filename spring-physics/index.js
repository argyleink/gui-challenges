import {SpringPhysics} from './spring-physics.js'

const emoji = document.querySelector('.emoji')

const demo = new SpringPhysics(1, null, value => {
  emoji.style.setProperty('--physics', value)
})

document.addEventListener('pointerup', e =>
  demo.to(1.5))

document.addEventListener('pointerdown', e =>
  demo.to(.75))