import $ from 'blingblingjs'
import Toast from './toast.js'

$('#spells').on('click', async () => {
  await Toast(randomSpell())
  console.log('poof')
})

$('#actions').on('click', () => {
  Toast(randomAction())
})

const randomSpell = () => {
  const spells = ['Fire', 'Ice', 'Lit', 'Dark', 'Toast']
  const levels = ['','2','3','4','5']
  return `${spells[getRandomInt(0, spells.length-1)]}${levels[getRandomInt(0, levels.length-1)]}`
}

const randomAction = () => {
  const actions = ['Saved', 'Added to cart', 'In cart', 'User removed', 'Timer set', `Multi-Line \n Support 👍`, 'This is just really long and completely unnecessary']
  return `${actions[getRandomInt(0, actions.length-1)]}`
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}