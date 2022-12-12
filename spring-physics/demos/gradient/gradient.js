import {SpringPhysics} from '/spring-physics.js'

const gradient = document.querySelector('.gradient')

gradient.physics = new SpringPhysics({
  startAt: 200, 
  options: {
    namespace: '--hue',
    friction: 5,
  }, 
  update: ({namespace, value}) => {
    gradient.style.setProperty(namespace, value)
  }
})

gradient.addEventListener('pointerup', e =>
  gradient.physics.to(200))

gradient.addEventListener('pointerdown', e =>
  gradient.physics.to(250))