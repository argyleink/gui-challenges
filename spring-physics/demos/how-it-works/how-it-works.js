import {SpringPhysics} from '/spring-physics.js'
import $ from 'blingblingjs'

const [title] = $('.how-it-works')

title.physics = new SpringPhysics({
  startAt: 10,
  update: ({value}) => {
    title.textContent = value.toFixed()
  }
})

title.on('pointerup keyup', e =>
  title.physics.to(10))

title.on('pointerdown keydown', e =>
  title.physics.to(100))