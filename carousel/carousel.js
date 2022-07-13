import 'https://cdn.jsdelivr.net/gh/argyleink/scrollyfills@latest/dist/scrollyfills.modern.js'

// util
const getElementIndex = node => {
  let index = 0
  while (node = node.previousElementSibling)
    index++
  return index
}

// state and selectors
const carousel = {
  elements: { 
    root:     document.querySelector('.gui-carousel'),
    scroller: document.querySelector('.gui-carousel--scroller'),
    items:    document.querySelectorAll('.gui-carousel--scroll-item'),
    snaps:    document.querySelectorAll('.gui-carousel--snap'),
    previous: document.querySelector('.gui-carousel--control.--previous'),
    next:     document.querySelector('.gui-carousel--control.--next'),
    minimap:  document.querySelector('.gui-carousel--map'),
  },
  current: undefined,
  hasIntersected: new Set(),
}

// observe in view
const carousel_observer = new IntersectionObserver(observations => {
  for (let node of observations)
    carousel.hasIntersected.add(node)
}, { 
  root: carousel.elements.scroller
})

const synchronize = () => {
  for (let observation of carousel.hasIntersected) {
    // toggle class based on if it's currently intersecting
    observation.target.classList
      .toggle('--in-view', observation.isIntersecting)
    
    // toggle inert when it's not intersecting
    observation.target
      .toggleAttribute('inert', !observation.isIntersecting)
    
    // toggle aria-selected on pagination dots
    const dot = carousel.elements.minimap
      .children[getElementIndex(observation.target)]
    
    dot.setAttribute('aria-selected', observation.isIntersecting)
    dot.setAttribute('tabindex', !observation.isIntersecting ? '-1' : '0')

    // stash the intersecting element
    // TODO: intersecting element isnt always the current
    if (observation.isIntersecting)
      carousel.current = observation.target
  }
  
  toggleControlsDisability()

  carousel.hasIntersected.clear()
}

const toggleControlsDisability = () => {
  let {lastElementChild:last, firstElementChild:first} = carousel.elements.scroller
  
  let isAtEnd =   carousel.current === last
  let isAtStart = carousel.current === first

  // before we possibly disable a button
  // shift the focus to the complimentary button
  if (document.activeElement === carousel.elements.next && isAtEnd)
    carousel.elements.previous.focus()
  else if (document.activeElement === carousel.elements.previous && isAtStart)
    carousel.elements.next.focus()

  carousel.elements.next.toggleAttribute('disabled', isAtEnd)
  carousel.elements.previous.toggleAttribute('disabled', isAtStart)
}

for (let item of carousel.elements.snaps)
  carousel_observer.observe(item)

carousel.elements.scroller.addEventListener('scrollend', () => {
  synchronize()
})

// next and previous click events
const goNext = () => {
  const next = carousel.current?.nextElementSibling

  if (carousel.current === next)
    return

  if (next) {
    carousel.elements.scroller.scrollBy(20, 0)
    // next.scrollIntoView({block: 'nearest', inline: 'nearest'})
    carousel.current = next
  }
  else {
    console.log('at the end')
  }
}

const goPrev = () => {
  const previous = carousel.current?.previousElementSibling

  if (carousel.current === previous)
    return

  if (previous) {
    carousel.elements.scroller.scrollBy(-20, 0)
    // previous.scrollIntoView({block: 'nearest', inline: 'nearest'})
    carousel.current = previous
  }
  else {
    console.log('at the beginning')
  }
}
 
carousel.elements.next.addEventListener('click', e => goNext())
carousel.elements.previous.addEventListener('click', e => goPrev())

// pagination handlers
carousel.elements.minimap.addEventListener('click', e => {
  e.target.setAttribute('aria-selected', true)
  carousel.elements
    .items[getElementIndex(e.target)]
    .scrollIntoView({block: 'nearest', inline: 'nearest'})
})

carousel.elements.root.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowRight':
      if (e.target.closest('.gui-carousel--map'))
        carousel.elements
          .minimap.children[getElementIndex(e.target) + 1]
          ?.focus()
      else {
        if (document.activeElement === carousel.elements.next) {
          carousel.elements.next.style.animation = 'gui-carousel--control-keypress 145ms var(--ease-2)'
          carousel.elements.next.addEventListener('animationend', e => {
            carousel.elements.next.style.animation = null
          }, {once: true})
        }
        carousel.elements.next.focus()  
      }
      goNext()
      break
    case 'ArrowLeft':
      if (e.target.closest('.gui-carousel--map'))
        carousel.elements
          .minimap.children[getElementIndex(e.target) - 1]
          ?.focus()
      else {
        if (document.activeElement === carousel.elements.previous) {
          carousel.elements.previous.style.animation = 'gui-carousel--control-keypress 145ms var(--ease-2)'
          carousel.elements.previous.addEventListener('animationend', e => {
            carousel.elements.previous.style.animation = null
          }, {once: true})
        }
        carousel.elements.previous.focus()
      }
      goPrev()
      break
  }
})

// marker factory
const createMarkerDot = ({index, type, item}) => {
  // <button class="gui-carousel--control" type="button" role="tab" aria-label="Item 1" title="Item 1" aria-controls="carousel-item-1"></button>
  const marker = document.createElement('button')
  const img = item.querySelector('img')
  marker.className = 'gui-carousel--control'
  marker.type = 'button'
  marker.role = 'tab'
  marker.title = `Item ${index}: ${img.alt}`
  marker.setAttribute('aria-label', `Item ${index}: ${img.alt}`)
  marker.setAttribute('aria-controls', `carousel-item-${index}`)
  return marker
}

const createMarkerGallery = ({index, type, item}) => {
  // <button class="gui-carousel--control --gallery" type="button" role="tab" aria-label="Item 1" title="Item 1" aria-controls="carousel-item-1"></button>
  const marker = document.createElement('button')
  const img = item.querySelector('img')
  marker.style.backgroundImage = `url(${img.src})`
  marker.className = 'gui-carousel--control --gallery'
  marker.type = 'button'
  marker.role = 'tab'
  marker.title = `Item ${index}: ${img.alt}`
  marker.setAttribute('aria-label', `Item ${index}: ${img.alt}`)
  marker.setAttribute('aria-controls', `carousel-item-${index}`)
  return marker
}

const createMarker = (item, index) => {
  const markerType = carousel.elements.root.getAttribute('carousel-pagination')
  index++ // user facing index shouldnt start at 0
  
  if (markerType == 'gallery')
    return createMarkerGallery({index, type: markerType, item})
  else
    return createMarkerDot({index, type: markerType, item})
}

// kickoff matching state to DOM
// TODO: match all carousels
carousel.elements.snaps.forEach((item, index) => {
  carousel.hasIntersected.add({
    isIntersecting: index === 0,
    target: item,
  })
  
  carousel.elements.minimap
    .appendChild(createMarker(item, index))
  
  if (index === 0)
    carousel.current = item
})

synchronize()