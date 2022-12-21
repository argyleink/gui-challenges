import {SpringPhysics} from '/spring-physics.js'
import $ from 'blingblingjs'

const dots = $('.dots > *')

dots.forEach(dot => {
  dot.physics = new SpringPhysics({
    startAt: 0, 
    options: {
      namespace: '--y',
      friction: 1,
    }, 
    update: ({namespace, value}) => {
      dot.style.setProperty(namespace, value.toFixed()+'px')
    }
  })

  dot.on('mouseover focus', e =>
    dot.physics.to(50))

  dot.on('mouseout blur', e =>
    dot.physics.to(0))
})