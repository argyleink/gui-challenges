import {SpringPhysics} from '/spring-physics.js'
import $ from 'blingblingjs'

const [title] = $('.letter-spacing')

title.physics = new SpringPhysics({
  startAt: 3, 
  options: {
    namespace: '--fontSize',
    friction: .2,
  }, 
  update: ({namespace, value}) => {
    title.style.setProperty('--letterspacing', (value*6)+'px')
  }
})

title.on('pointerup keyup', e =>
  title.physics.to(3))

title.on('pointerdown keydown', e =>
  title.physics.to(5))