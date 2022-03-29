// track opening
const dialogAttrObserver = new MutationObserver((mutations, observer) => {
  mutations.forEach(mutation => {
    if (mutation.attributeName === 'open')
      dialogOpen(mutation)
  })
})

// track deletion
const dialogDeleteObserver = new MutationObserver((mutations, observer) => {
  mutations.forEach(mutation => {
    mutation.removedNodes.forEach(removedNode => {
      if (removedNode.nodeName === 'DIALOG')
        dialogDeleted(removedNode)
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

// dialog opening handler
const dialogOpen = async ({target:dialog}) => {
  const isOpen = dialog.hasAttribute('open')
  if (!isOpen) return

  console.log('Opening', dialog)
  await animationsComplete(dialog)
  console.log('Opened', dialog)
}

// dialog closing handler
const dialogClose = async ({target:dialog}) => {
  console.log('Closing', dialog)
  console.info('Dialog user action:', dialog.returnValue)

  const dialogFormData = new FormData(dialog.querySelector('form'))
  console.info('Dialog form data', dialogFormData)

  await animationsComplete(dialog)
  console.log('Closed', dialog)

  dialog.querySelector('form')?.reset()
}

// dialog deleted handler
const dialogDeleted = dialog => {
  dialog.removeEventListener('click', lightDismiss)
  dialog.removeEventListener('close', dialogClose)
  console.log('Dialog removed', dialog)
}

// page load dialogs setup
document.querySelectorAll('dialog').forEach(async dialog => {
  dialog.addEventListener('click', lightDismiss)
  dialog.addEventListener('close', dialogClose)

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