const init = () => {
  const node = document.createElement('section')
  node.classList.add('gui-toast-group')

  document.body.prepend(node)
  return node
}

const createToast = text => {
  const node = document.createElement('output')
  
  node.innerText = text
  node.classList.add('gui-toast')

  return node
}

const addToast = toast => {
  const { matches:motionOK } = window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  )

  Toaster.children.length && motionOK
    ? flipToast(toast)
    : Toaster.appendChild(toast)
}

const removeToast = toast => {
  toast.classList.add('exit')

  return new Promise((resolve, reject) => {
    toast.ontransitionend = () => {
      Toaster.removeChild(toast)
      resolve()  
    }  
  })
}

const Toast = text => {
  const toast = createToast(text)
  addToast(toast)

  requestAnimationFrame(() => {
    toast.classList.add('enter')
  })

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      await removeToast(toast)
      resolve()
    }, 5000)
  })
}

// https://aerotwist.com/blog/flip-your-animations/
const flipToast = toast => {
  const FLIPS = new Array()
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
  })

  kids_to_move.forEach((child, i) => {
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

const Toaster = init()
export default Toast