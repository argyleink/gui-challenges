import {SpringPhysics} from '../spring-physics.js'

const size = document.querySelector('.size')

const sizePhysics = new SpringPhysics({
  startAt: 300, 
  options: {
    namespace: '--size',
    friction: .5,
  }, 
  update: ({namespace, value}) => {
    size.style.setProperty(namespace, value+'px')
  }
})

size.addEventListener('pointerup', e =>
  sizePhysics.to(300))

size.addEventListener('pointerdown', e =>
  sizePhysics.to(450))