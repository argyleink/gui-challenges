import {elementsByLetter, elementsByWord} from './splitting.js'

const {matches:motionOK} = window.matchMedia(
  '(prefers-reduced-motion: no-preference)'
)

if (motionOK) {
  const splitLetter = document.querySelector('#split-by-letter')
  const splitWord = document.querySelector('#split-by-word')

  const splitLetters = elementsByLetter(splitLetter.textContent)
  const splitWords = elementsByWord(splitWord.textContent)

  splitLetter.firstChild.replaceWith(...splitLetters)
  splitWord.firstChild.replaceWith(...splitWords)
}