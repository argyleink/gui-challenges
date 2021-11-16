import $ from 'blingblingjs'
import Toast from './toast.js'

$('button').on('click', async () => {
  await Toast({
    text: randomSpell(),
    // text: 'super duper long toast that no one should ever write',
    // duration: '4s',
  })
  console.log('poof')
})

const randomSpell = () => {
  const spells = ['Fire', 'Ice', 'Lit', 'Dark', 'Toast']
  const levels = ['','II','III','IV','V']
  return `${spells.at(getRandomInt(0, spells.length-1))}${levels.at(getRandomInt(0, levels.length-1))}`
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}