import {SpringPhysics} from '../spring-physics.js'

const chars = document.querySelectorAll('.boldness > span')

chars.forEach(char => {
  char.physics = new SpringPhysics({
    startAt: 48, 
    options: {
      namespace: '--boldness',
      friction: 5,
    }, 
    update: ({namespace, value}) => {
      char.style.setProperty(namespace, value.toFixed() + 'px')
    }
  })

  char.addEventListener('mouseover', e =>
    char.physics.to(100))

  char.addEventListener('mouseout', e =>
    char.physics.to(48))
})