const Toaster = document.createElement('section')
Toaster.classList.add('gui-toast-group')
document.body.prepend(Toaster)

const createToast = ({text = 'Default text', duration = null}) => {
  const node = document.createElement('output')
  
  node.textContent = text
  node.classList.add('gui-toast')
  node.style.setProperty('--_duration', duration)

  return node
}

const addToast = toast => {
  Toaster.children.length
    ? flipToast(toast)
    : Toaster.appendChild(toast)
}

const Toast = options => {
  let toast = createToast(options)
  addToast(toast)

  return new Promise((resolve, reject) => {
    toast.onanimationend = e => {
      Toaster.removeChild(toast)
      resolve()  
    }
  })
}

// https://aerotwist.com/blog/flip-your-animations/
const flipToast = toast => {
  const FLIPS = []
  const kids_to_move = Array.from(Toaster.children)

  // FIRST
  kids_to_move.forEach((child, i) => {
    FLIPS[i] = {
      first: child.getBoundingClientRect()
    }
  })

  Toaster.appendChild(toast)

  // LAST
  kids_to_move.forEach((child, i) => {
    FLIPS[i].last = child.getBoundingClientRect()
    let {first, last} = FLIPS[i]

    // INVERT
    let invert = first.top - last.top
    
    // PLAY
    child.animate([
      { transform: `translateY(${invert}px)` },
      { transform: 'translateY(0)' }
    ], {
      duration: 100,
      easing: 'ease-out',
    })
  })
}

export default Toast