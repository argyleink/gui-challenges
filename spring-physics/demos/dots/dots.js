import {SpringPhysics} from '/spring-physics.js'

const dots = document.querySelectorAll('.dots > *')

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

  dot.addEventListener('mouseover', e =>
    dot.physics.to(50))

  dot.addEventListener('mouseout', e =>
    dot.physics.to(0))
})