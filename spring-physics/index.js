import {SpringPhysics} from './spring-physics.js'

const emoji = document.querySelector('.emoji')
const gradient = document.querySelector('.gradient')

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
  scalePhysics.to(1.5))

emoji.addEventListener('pointerdown', e =>
  scalePhysics.to(.75))




const rotationPhysics = new SpringPhysics({
  startAt: 180, 
  options: {
    namespace: '--hue',
    friction: 5,
  }, 
  update: ({namespace, value}) => {
    gradient.style.setProperty(namespace, value)
  }
})

gradient.addEventListener('pointerup', e =>
  rotationPhysics.to(250))

gradient.addEventListener('pointerdown', e =>
  rotationPhysics.to(200))


const radiusPhysics = new SpringPhysics({
  startAt: 25, 
  options: {
    namespace: '--radius',
    friction: 1,
  }, 
  update: ({namespace, value}) => {
    gradient.style.setProperty(namespace, value+'px')
  }
})

gradient.addEventListener('pointerup', e =>
  radiusPhysics.to(25))

gradient.addEventListener('pointerdown', e =>
  radiusPhysics.to(35))