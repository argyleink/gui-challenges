const span = (text, index) => {
  const node = document.createElement('span')

  node.textContent = text
  node.style.setProperty('--index', index)
  
  return node
}

export const byLetter = text =>
  [...text].map(span)

export const byWord = text =>
  text.split(' ').map(span)
