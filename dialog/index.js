// custom events to be added to <dialog>
const dialogClosingEvent = new Event('closing')
const dialogClosedEvent  = new Event('closed')
const dialogOpeningEvent = new Event('opening')
const dialogOpenedEvent  = new Event('opened')
const dialogRemovedEvent = new Event('removed')

// track opening
const dialogAttrObserver = new MutationObserver((mutations, observer) => {
  mutations.forEach(async mutation => {
    if (mutation.attributeName === 'open') {
      const dialog = mutation.target

      const isOpen = dialog.hasAttribute('open')
      if (!isOpen) return

      dialog.dispatchEvent(dialogOpeningEvent)
      await animationsComplete(dialog)
      dialog.dispatchEvent(dialogOpenedEvent)
    }
  })
})

// track deletion
const dialogDeleteObserver = new MutationObserver((mutations, observer) => {
  mutations.forEach(mutation => {
    mutation.removedNodes.forEach(removedNode => {
      if (removedNode.nodeName === 'DIALOG')
        removedNode.dispatchEvent(dialogRemovedEvent)
    })
  })
})

// wait for all dialog animations to complete their promises
const animationsComplete = element =>
  Promise.allSettled(
    element.getAnimations().map(animation => 
      animation.finished))

// click outside the dialog handler
const lightDismiss = ({target:dialog}) => {
  if (dialog.nodeName === 'DIALOG')
    dialog.close('dismiss')
}

// dialog close handler
const dialogClose = async ({target:dialog}) => {
  dialog.dispatchEvent(dialogClosingEvent)

  await animationsComplete(dialog)

  dialog.dispatchEvent(dialogClosedEvent)
}

const dialogClosing = ({target:dialog}) => {
  console.log('Dialog closing', dialog)
}

const dialogClosed = ({target:dialog}) => {
  console.log('Dialog closed', dialog)
  console.info('Dialog user action:', dialog.returnValue)

  const dialogFormData = new FormData(dialog.querySelector('form'))
  console.info('Dialog form data', Object.fromEntries(dialogFormData.entries()))

  dialog.querySelector('form')?.reset()
}

// dialog open handler
const dialogOpened = ({target:dialog}) => {
  console.log('Dialog open', dialog)
}

// dialog opening handler
const dialogOpening = ({target:dialog}) => {
  console.log('Dialog opening', dialog)
}

// dialog deleted handler
const dialogRemoved = ({target:dialog}) => {
  dialog.removeEventListener('click', lightDismiss)
  dialog.removeEventListener('close', dialogClose)
  dialog.removeEventListener('closing', dialogClosing)
  dialog.removeEventListener('closed', dialogClosed)
  dialog.removeEventListener('opening', dialogOpening)
  dialog.removeEventListener('opened', dialogOpened)
  dialog.removeEventListener('removed', dialogRemoved)
  console.log('Dialog removed', dialog)
}

// page load dialogs setup
document.querySelectorAll('dialog').forEach(async dialog => {
  dialog.addEventListener('click', lightDismiss)
  dialog.addEventListener('close', dialogClose)
  dialog.addEventListener('closing', dialogClosing)
  dialog.addEventListener('closed', dialogClosed)
  dialog.addEventListener('opening', dialogOpening)
  dialog.addEventListener('opened', dialogOpened)
  dialog.addEventListener('removed', dialogRemoved)

  dialogAttrObserver.observe(dialog, { 
    attributes: true,
  })

  dialogDeleteObserver.observe(document.body, {
    attributes: false,
    subtree: false,
    childList: true,
  })

  // remove loading attribute
  // prevent page load @keyframes playing
  await animationsComplete(dialog)
  dialog.removeAttribute('loading')
})