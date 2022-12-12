import {SpringPhysics} from '/spring-physics.js'

const emoji = document.querySelector('.emoji')

emoji.physics = new SpringPhysics({
  startAt: 1,
  options: {
    namespace: '--scale',
  },
  update: ({namespace, value}) => {
    emoji.style.setProperty(namespace, value)
  },
})

emoji.addEventListener('pointerup', e =>
  emoji.physics.to(1))

emoji.addEventListener('pointerdown', e =>
  emoji.physics.to(.75))