import {SpringPhysics} from '/spring-physics.js'
import $ from 'blingblingjs'

const [emoji] = $('.emoji')

emoji.physics = new SpringPhysics({
  startAt: 1,
  options: {
    namespace: '--scale',
  },
  update: ({namespace, value}) => {
    emoji.style.setProperty(namespace, value)
  },
})

emoji.on('pointerup keyup', e =>
  emoji.physics.to(1))

emoji.on('pointerdown keydown', e =>
  emoji.physics.to(.75))