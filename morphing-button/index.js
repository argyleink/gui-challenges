const spinner = '<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24"><use href="#icon.spinner"></use></svg>'

const states = {
  idle: 'Do some hard work',
  sending: `${spinner} working...`,
  done: 'Done!',
}

demo.onclick = () => {
  setState('sending')
  setTimeout(() => setState('done'), 4000)
  setTimeout(() => setState('idle'), 6000)
}

function setState(state) {
  if (!document.startViewTransition)
    demo.innerHTML = states[state]
  else
    document.startViewTransition(() => 
      demo.innerHTML = states[state])
}