import {SpringPhysics} from '/spring-physics.js'

const size = document.querySelector('.width')

size.physics = new SpringPhysics({
  startAt: 300, 
  options: {
    namespace: '--width',
    friction: .5,
  }, 
  update: ({namespace, value}) => {
    size.style.setProperty(namespace, value+'px')
  }
})

size.addEventListener('pointerup', e =>
  size.physics.to(300))

size.addEventListener('pointerdown', e =>
  size.physics.to(450))