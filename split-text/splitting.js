const span = (text, index) => {
  const node = document.createElement('span')

  node.textContent = text
  node.style.setProperty('--index', index)
  
  return node
}

export const elementsByLetter = text =>
  [...text].map(span)

export const elementsByWord = text =>
  text.split(' ').map(span)
