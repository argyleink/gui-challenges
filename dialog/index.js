import GuiDialog from './dialog.js'

const handleFile = form => {
  const file = form.get('userimage')
  if (!file.size) return

  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.onload = e => {
    const main = document.querySelector('main')
    
    const newuser = document.createElement('div')
    newuser.className = 'new user'
    
    const avatar = document.createElement('img')
    avatar.src = e.target.result

    const button = document.createElement('button')
    button.title = 'Remove user'
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    `

    newuser.appendChild(avatar)
    newuser.appendChild(button)

    main.appendChild(newuser)
    main.appendChild(main.querySelector('button.user'))
  }
}

// new events
const dialogClosing = ({target:dialog}) => {
  console.log('Dialog closing', dialog)
}

const dialogClosed = ({target:dialog}) => {
  console.log('Dialog closed', dialog)
  console.info('Dialog user action:', dialog.returnValue)

  if (dialog.returnValue === 'confirm') {
    const dialogFormData = new FormData(dialog.querySelector('form'))
    console.info('Dialog form data', Object.fromEntries(dialogFormData.entries()))
    handleFile(dialogFormData)

    dialog.querySelector('form')?.reset()
  }
}

const dialogOpened = ({target:dialog}) => {
  console.log('Dialog open', dialog)
}

const dialogOpening = ({target:dialog}) => {
  console.log('Dialog opening', dialog)
}

const dialogRemoved = ({target:dialog}) => {
  // cleanup new/optional <dialog> events
  dialog.removeEventListener('closing', dialogClosing)
  dialog.removeEventListener('closed', dialogClosed)
  dialog.removeEventListener('opening', dialogOpening)
  dialog.removeEventListener('opened', dialogOpened)
  dialog.removeEventListener('removed', dialogRemoved)

  console.log('Dialog removed', dialog)
}

// SETUP
document.querySelectorAll('dialog[modal-mode="mega"]').forEach(dialog => {
  // sugar up <dialog> elements
  GuiDialog(dialog)

  // new/optional <dialog> events to choose from
  dialog.addEventListener('closing', dialogClosing)
  dialog.addEventListener('closed', dialogClosed)
  dialog.addEventListener('opening', dialogOpening)
  dialog.addEventListener('opened', dialogOpened)
  dialog.addEventListener('removed', dialogRemoved)
})

// remove button
document.querySelector('main').addEventListener('click', e => {
  // filter event targets for the remove buttons
  const removeButton = e.target.closest('button:not(.user)')
  if (!removeButton) return

  const bounds = removeButton.getBoundingClientRect()
  const miniModalHeight = window.MiniDialog.clientHeight - 15
  const miniModalWidth = window.MiniDialog.clientWidth / 2

  let left = bounds.left - miniModalWidth
  if (left < 0) left = 10

  window.MiniDialog.style.marginTop = bounds.y - miniModalHeight + 'px'
  window.MiniDialog.style.marginLeft = null
  if (window.innerWidth >= 768)
    window.MiniDialog.style.marginLeft = left + 'px'
  window.MiniDialog.showModal()

  window.MiniDialog.addEventListener('closing', ({target:dialog}) => {
    if (dialog.returnValue === 'confirm') {
      const user = removeButton.closest('.user')
      user.style.animation = 'var(--animation-scale-down), var(--animation-fade-out)'
      user.addEventListener('animationend', e => {
        user.remove()
      }, {once: true})
    }
  }, {once: true})
})

document.querySelectorAll('dialog[modal-mode="mini"]').forEach(dialog => {
  GuiDialog(dialog)
})