import {rovingIndex} from 'roving-ux'

document.querySelectorAll('.gui-split-button > span')
  .forEach(element => rovingIndex({
    element,
    target: 'button',
  }))