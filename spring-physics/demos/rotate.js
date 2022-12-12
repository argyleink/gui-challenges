import {SpringPhysics} from '../spring-physics.js'

const rotate = document.querySelector('.rotate')

const rotationPhysics = new SpringPhysics({
  startAt: 0, 
  options: {
    namespace: '--rotate',
    friction: 10,
  }, 
  update: ({namespace, value}) => {
    rotate.style.setProperty(namespace, value+'turn')
  }
})

rotate.addEventListener('pointerdown', e => rotationPhysics.to(.5))
rotate.addEventListener('pointerup', e => rotationPhysics.to(0))