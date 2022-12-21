import {SpringPhysics} from '/spring-physics.js'
import $ from 'blingblingjs'

const [gradient] = $('.gradient')

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

gradient.on('pointerup keyup', e =>
  gradient.physics.to(200))

gradient.on('pointerdown keydown', e =>
  gradient.physics.to(250))