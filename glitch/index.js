function glitchyPaths() {
  document.querySelector('pre').textContent = `
@keyframes cyberpunk-glitch {
  0%  { clip-path: polygon(${punkyPolygons()}); }
  4%  { clip-path: polygon(${punkyPolygons()}); }
  27% { clip-path: polygon(${punkyPolygons()}); }
  51% { clip-path: polygon(${punkyPolygons()}); }
  66% { clip-path: polygon(${punkyPolygons()}); }
  91% { clip-path: polygon(${punkyPolygons()}); }

  1%, 5%, 28%, 53%, 67%, 92% {
    clip-path: none;
  }
}
  `.trim()
}

function punkyPolygons() {
  const collection = new Set()
  
  for (let i = 0; i <= 25; i++)
    collection.add(`${rando()}% ${rando()}%`)
  
  return Array.from(collection.values()).join(',')
}

function rando() {
  return (Math.random() * 100).toFixed()
}

glitchyPaths()
document.querySelector('button').onclick = glitchyPaths