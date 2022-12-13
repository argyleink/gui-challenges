import {SpringPhysics} from '/spring-physics.js'
import $ from 'blingblingjs'

const [rotate] = $('.rotate')

rotate.physics = new SpringPhysics({
  startAt: 0, 
  options: {
    namespace: '--rotate',
    friction: 10,
  }, 
  update: ({namespace, value}) => {
    rotate.style.setProperty(namespace, value+'turn')
  }
})

rotate.on('pointerdown keydown', e => rotate.physics.to(.5))
rotate.on('pointerup keyup', e => rotate.physics.to(0))