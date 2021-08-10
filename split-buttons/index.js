import $ from 'blingblingjs'
import {rovingIndex} from 'roving-ux'

$('.gui-popup-button').forEach(element => 
  rovingIndex({
    element,
    target: 'button',
  }))

$('.gui-split-button').on('click', event => {
  if (event.target.nodeName !== 'BUTTON') return
  console.info(event.target.innerText)
})

$('.gui-popup-button').on('keyup', e => {
  if (e.code === 'Escape')
    e.target.blur()
})
