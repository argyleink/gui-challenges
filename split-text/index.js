import {byLetter, byWord} from './splitting.js'

const {matches:motionOK} = window.matchMedia(
  '(prefers-reduced-motion: no-preference)'
)

if (motionOK) {
  const splitTargets = document.querySelectorAll('[split-by]')

  splitTargets.forEach(node => {
    const type = node.getAttribute('split-by')
    let nodes = null

    if (type === 'letter')
      nodes = byLetter(node.textContent)
    else if (type === 'word')
      nodes = byWord(node.textContent)

    if (nodes)
      node.firstChild.replaceWith(...nodes)
  })
}