const breadcrumbs = document.querySelector('.breadcrumbs')
const navs = document.querySelectorAll('.breadcrumbs select')
const allowedKeys = new Set(['Tab', 'Enter', ' '])
const preventedKeys = new Set(['ArrowUp', 'ArrowDown'])

navs.forEach(nav => {
  let ignoreChange = false

  nav.addEventListener('change', e => {
    if (ignoreChange) return

    console.info('User selected', e.target.value)
    // location.pathname = target.value
  })

  nav.addEventListener('keydown', ({ key }) => {
    if (preventedKeys.has(key))
      ignoreChange = true
    else if (allowedKeys.has(key))
      ignoreChange = false
  })
})