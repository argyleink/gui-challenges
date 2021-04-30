const KEYCODE = {
  LEFT:  37,
  RIGHT: 39,
}

const state = new Map()

export const rovingIndex = ({element:rover, target:selector}) => {
  // this api allows empty or a query string
  const target_query = selector || ':scope *'
  const targets = rover.querySelectorAll(target_query)
  const startingPoint = targets[0]

  // take container out of the focus flow
  rover.tabIndex = -1
  // and all the children
  targets.forEach(a => a.tabIndex = -1)
  // except the first target, that accepts focus
  startingPoint.tabIndex = 0

  // with the roving container as the key
  // save some state and handy references
  state.set(rover, {
    targets,
    active: startingPoint,
    index: 0,
  })
    
  // when container or children get focus
  rover.addEventListener('focusin', _ => {
    if (state.get('last_rover') == rover) return

    activate(rover, state.get(rover).active)
    state.set('last_rover', rover)
  })

  // watch for arrow keys
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
}

const focusNextItem = rover => {
  const rx = state.get(rover)

  // increment state index
  rx.index += 1

  // clamp navigation to target bounds
  if (rx.index > rx.targets.length - 1)
    rx.index = rx.targets.length - 1

  // use rover index state to find next
  let next = rx.targets[rx.index]

  // found something, activate it
  next && activate(rover, next)
}

const focusPreviousItem = rover => {
  const rx = state.get(rover)

  // decrement from the state index
  rx.index -= 1

  // clamp to 0 and above only
  if (rx.index < 1)
    rx.index = 0

  // use rover index state to find next
  let prev = rx.targets[rx.index]

  // found something, activate it
  prev && activate(rover, prev)
}

const activate = (rover, item) => {
  const rx = state.get(rover)

  // remove old tab index item
  rx.active.tabIndex = -1

  // set new active item and focus it
  rx.active = item
  rx.active.tabIndex = 0
  rx.active.focus()
}