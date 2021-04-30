const rovers = document.querySelectorAll('[roving-on]')

const KEYCODE = {
  LEFT:  37,
  RIGHT: 39,
}

const state = new Map()

rovers.forEach(rover => {
  rover.tabIndex = -1
  const targets = rover.querySelectorAll(rover.getAttribute('roving-on'))
  const [startingPoint] = targets

  targets.forEach(a => a.tabIndex = -1)
  startingPoint.tabIndex = 0

  state.set(rover, {
    targets,
    active: startingPoint,
    index: 0,
  })
    
  rover.addEventListener('focusin', _ => {
    if (state.get('last_rover') == rover) return

    activate(rover, state.get(rover).active)
    state.set('last_rover', rover)
  })

  rover.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case KEYCODE.RIGHT:
        e.preventDefault()
        focusNextItem(rover)
        break
      case KEYCODE.LEFT:
        e.preventDefault()
        focusPreviousItem(rover)
        break
    }
  })
})

const focusNextItem = rover => {
  const rover_state = state.get(rover)
  rover_state.index += 1

  if (rover_state.index > rover.children.length - 1)
    rover_state.index = rover.children.length - 1

  let next = rover
    .children[rover_state.index]
    .querySelector(rover.getAttribute('roving-on'))

  next && activate(rover, next)
}

const focusPreviousItem = rover => {
  const rover_state = state.get(rover)
  rover_state.index -= 1

  if (rover_state.index < 1)
    rover_state.index = 0

  let prev = rover
    .children[rover_state.index]
    .querySelector(rover.getAttribute('roving-on'))

  prev && activate(rover, prev)
}

const activate = (rover, item) => {
  const rover_state = state.get(rover)
  rover_state.active.tabIndex = -1

  rover_state.active = item
  rover_state.active.tabIndex = 0
  rover_state.active.focus()
}