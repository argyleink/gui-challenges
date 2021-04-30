import {rovingIndex} from './roving-on.js'

document.querySelectorAll('.horizontal-media-scroller')
  .forEach(scroller => rovingIndex({
    element: scroller,
    target: 'a',
  }))