import {elementsByLetter, elementsByWord} from './splitting.js'

const {matches:motionOK} = window.matchMedia(
  '(prefers-reduced-motion: no-preference)'
)

if (motionOK) {
  const splitTargets = document.querySelectorAll('[split-by]')

  splitTargets.forEach(node => {
    const type = node.getAttribute('split-by')
    let splits = null

    if (type === 'letter')
      splits = elementsByLetter(node.textContent)
    else if (type === 'word')
      splits = elementsByWord(node.textContent)

    if (splits)
      node.firstChild.replaceWith(...splits)
  })
}