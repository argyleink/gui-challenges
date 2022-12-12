import {SpringPhysics} from '/spring-physics.js'

const radius = document.querySelector('.radius')

radius.physics = new SpringPhysics({
  startAt: 25, 
  options: {
    namespace: '--radius',
    friction: 1,
  }, 
  update: ({namespace, value}) => {
    radius.style.setProperty(namespace, value+'%')
  }
})

radius.addEventListener('pointerup', e =>
  radius.physics.to(25))

radius.addEventListener('pointerdown', e =>
  radius.physics.to(45))