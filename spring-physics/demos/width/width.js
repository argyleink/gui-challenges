import {SpringPhysics} from '/spring-physics.js'
import $ from 'blingblingjs'

const [size] = $('.width')

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

size.on('pointerup keyup', e =>
  size.physics.to(300))

size.on('pointerdown keydown', e =>
  size.physics.to(450))