import {SpringPhysics} from '/spring-physics.js'
import $ from 'blingblingjs'

const [radius] = $('.radius')

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

radius.on('pointerup keyup', e =>
  radius.physics.to(25))

radius.on('pointerdown keydown', e =>
  radius.physics.to(45))