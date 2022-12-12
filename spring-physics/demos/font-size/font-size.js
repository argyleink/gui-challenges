import {SpringPhysics} from '/spring-physics.js'

const chars = document.querySelectorAll('.font-size > span')

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

  char.addEventListener('mouseover', e => {
    char.physics.to(100)
    char?.nextElementSibling?.physics.to(70)
    char?.previousElementSibling?.physics.to(70)
  })

  char.addEventListener('mouseout', e => {
    char.physics.to(48)
    char?.nextElementSibling?.physics.to(48)
    char?.previousElementSibling?.physics.to(48)
  })
})