// light dismiss
opdialog.addEventListener('click', e => {
  if (e.target.nodeName === 'DIALOG') {
    opdialog.close('dismiss')
  }
})

// dialog user input result
opdialog.addEventListener('close', e => {
  const userChoice = opdialog.returnValue
  opdialog.querySelector('form')?.reset()

  console.info(userChoice)
})

// prevent page load @keyframes scaling down the dialog
document.querySelectorAll('dialog').forEach(async dialog => {
  await Promise.allSettled(
    dialog.getAnimations().map(animation => 
      animation.finished
    )
  )
  dialog.removeAttribute('loading')
})