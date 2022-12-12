import {SpringPhysics} from '../spring-physics.js'

const title = document.querySelector('.title')

const titlePhysics = new SpringPhysics({
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
  titlePhysics.to(3))

title.addEventListener('pointerdown', e =>
  titlePhysics.to(5))