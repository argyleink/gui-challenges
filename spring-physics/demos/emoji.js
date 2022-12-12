import {SpringPhysics} from '../spring-physics.js'

const emoji = document.querySelector('.emoji')

const scalePhysics = new SpringPhysics({
  startAt: 1,
  options: {
    namespace: '--scale',
  },
  update: ({namespace, value}) => {
    emoji.style.setProperty(namespace, value)
  },
})

emoji.addEventListener('pointerup', e =>
  scalePhysics.to(1))

emoji.addEventListener('pointerdown', e =>
  scalePhysics.to(.75))