import {rovingIndex} from 'roving-ux'

const breadcrumbs    = document.querySelectorAll('.breadcrumbs')
const navs           = document.querySelectorAll('.breadcrumbs select')
const allowedKeys    = new Set(['Tab', 'Enter', ' '])
const preventedKeys  = new Set(['ArrowUp', 'ArrowDown'])

// roving UX for breadcrumb components
breadcrumbs.forEach(nav => 
  rovingIndex({
    element: nav,
    target: 'a,select',
  }))

// watch crumbs for changes,
// ensures it's a full value change, 
// not a user exploring options via keyboard
navs.forEach(nav => {
  let ignoreChange = false

  nav.addEventListener('change', e => {
    if (ignoreChange) return

    const option = e.target
    const choice = option.value

    option.closest('.crumb').querySelector(':scope > a').textContent = choice
    console.info('User wishes to change path to: ', choice)

    // change entire URL
    // location.pathname = target.value
    // or 
    // use your favorite clientside framework's router
  })

  nav.addEventListener('keydown', ({ key }) => {
    if (preventedKeys.has(key))
      ignoreChange = true
    else if (allowedKeys.has(key))
      ignoreChange = false
  })
})