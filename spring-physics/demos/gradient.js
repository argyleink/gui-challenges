import {SpringPhysics} from '../spring-physics.js'

const gradient = document.querySelector('.gradient')

const rotationPhysics = new SpringPhysics({
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
  rotationPhysics.to(200))

gradient.addEventListener('pointerdown', e =>
  rotationPhysics.to(250))