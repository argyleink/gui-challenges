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

    console.info('User wishes to change path to: ', e.target.value)
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