import {SpringPhysics} from '/spring-physics.js'

const list = document.querySelectorAll('.shuffle-stack > *')

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

document.querySelector('.shuffle-stack').onclick = e => {
  const shuffled = shuffle(Array.from(list))
  
  shuffled.forEach((item, i) => {
    item.physics.to(i * 25)
  })
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}