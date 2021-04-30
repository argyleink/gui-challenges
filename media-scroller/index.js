import {rovingIndex} from 'roving-ux'

document.querySelectorAll('.horizontal-media-scroller')
  .forEach(scroller => rovingIndex({
    element: scroller,
    target: 'a',
  }))