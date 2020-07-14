const sidenav = document.querySelector('#sidenav-open')
const closenav = document.querySelector('#sidenav-close')
const hamburger = document.querySelector('#sidenav-button')

// set focus to our open/close buttons after animation
sidenav.addEventListener('transitionend', e => {
  if (document.location.hash === '#sidenav-open')
    closenav.focus()
  else
    hamburger.focus()
})

// close our menu when esc is pressed
sidenav.addEventListener('keyup', e => {
  if (e.code === 'Escape')
    document.location.hash = ''
})