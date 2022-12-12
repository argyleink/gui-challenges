import {SpringPhysics} from '/spring-physics.js'

const title = document.querySelector('.letter-spacing')

title.physics = new SpringPhysics({
  startAt: 3, 
  options: {
    namespace: '--fontSize',
    friction: .2,
  }, 
  update: ({namespace, value}) => {
    // title.style.setProperty(namespace, value+'rem')
    title.style.setProperty('--letterspacing', (value*6)+'px')
  }
})

title.addEventListener('pointerup', e =>
  title.physics.to(3))

title.addEventListener('pointerdown', e =>
  title.physics.to(5))