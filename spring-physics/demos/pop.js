import {SpringPhysics} from '../spring-physics.js'

const orbs = document.querySelectorAll('.orb')

orbs.forEach(orb => {
  orb.physics = new SpringPhysics({
    startAt: 0, 
    options: {
      namespace: '--pop',
      friction: 1,
    }, 
    update: ({namespace, value}) => {
      orb.style.setProperty(namespace, value.toFixed()+'px')
    }
  })

  orb.addEventListener('mouseover', e =>
    orb.physics.to(50))

  orb.addEventListener('mouseout', e =>
    orb.physics.to(0))
})