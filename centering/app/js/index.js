import 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/prism.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/plugins/line-numbers/prism-line-numbers.min.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js'
import $ from 'https://unpkg.com/blingblingjs@2.1.1/src/index.js'

$('input[type="checkbox"]').on('click', e => {
  const prop = e.target.getAttribute('name')

  e.target
    .closest('section')
    .querySelector(':root article')
    .style[prop] = e.target.checked
      ? e.target.value
      : null
})