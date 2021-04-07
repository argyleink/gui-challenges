export const elementsByLetter = text => {
  return [...text].map((letter, i) => {
    const node = document.createElement('span')

    node.textContent = letter
    node.style.setProperty('--index', i)
    
    return node
  })
}

export const elementsByWord = text => {
  return text.split(' ').map((word, i) => {
    const node = document.createElement('span')

    node.textContent = word
    node.style.setProperty('--index', i)
    
    return node
  })
}