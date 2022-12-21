import {SpringPhysics} from '/spring-physics.js'
import $ from 'blingblingjs'

const chars = $('.font-size > span')

chars.forEach(char => {
  char.physics = new SpringPhysics({
    startAt: 48, 
    options: {
      namespace: '--fontsize',
      friction: 5,
    }, 
    update: ({namespace, value}) => {
      char.style.setProperty(namespace, value.toFixed() + 'px')
    }
  })

  char.on('mouseover focus', e => {
    char.physics.to(100)
    char?.nextElementSibling?.physics.to(70)
    char?.previousElementSibling?.physics.to(70)
  })

  char.on('mouseout blur', e => {
    char.physics.to(48)
    char?.nextElementSibling?.physics.to(48)
    char?.previousElementSibling?.physics.to(48)
  })
})