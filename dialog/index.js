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

    newuser.appendChild(avatar)
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
document.querySelectorAll('dialog').forEach(dialog => {
  // sugar up <dialog> elements
  GuiDialog(dialog)

  // new/optional <dialog> events to choose from
  dialog.addEventListener('closing', dialogClosing)
  dialog.addEventListener('closed', dialogClosed)
  dialog.addEventListener('opening', dialogOpening)
  dialog.addEventListener('opened', dialogOpened)
  dialog.addEventListener('removed', dialogRemoved)
})