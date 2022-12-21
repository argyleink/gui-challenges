import {SpringPhysics} from '/spring-physics.js'
import $ from 'blingblingjs'

const list = $('.shuffle-stack > *')

list.forEach((item, i) => {
  item.physics = new SpringPhysics({
    startAt: i * 25, 
    options: {
      namespace: '--top',
      tension: 400,
    }, 
    update: ({namespace, value}) => {
      item.style.setProperty(namespace, value.toFixed() + 'px')
    }
  })
})

$('.shuffle-stack').on('click keydown', e => {
  const shuffled = shuffle(list)
  
  shuffled.forEach((item, i) => {
    item.physics.to(i * 25)
  })
})

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}