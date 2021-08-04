import {rovingIndex} from 'roving-ux'

document.querySelectorAll('.gui-split-button > span')
  .forEach(element => rovingIndex({
    element,
    target: 'button',
  }))

document.querySelectorAll('.gui-popup')
  .forEach(popup => {
    popup.addEventListener('click', event => {
      let splitbtn = event.target.closest('.gui-split-button')
      splitbtn.querySelector(':scope > button').textContent = event.target.innerText
    })
  })