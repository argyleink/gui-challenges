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
    root: document.querySelector('.gui-carousel'),
    scroller: document.querySelector('.gui-carousel--scroller'),
    items: document.querySelectorAll('.gui-carousel--scroll-item'),
    previous: document.querySelector('.gui-carousel--control.--previous'),
    next: document.querySelector('.gui-carousel--control.--next'),
    minimap: document.querySelector('.gui-carousel--map'),
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
  
  let {lastElementChild:last, firstElementChild:first} = carousel.elements.scroller
  carousel.elements.next.setAttribute('aria-disabled', carousel.current === last)
  carousel.elements.previous.setAttribute('aria-disabled', carousel.current === first)

  carousel.hasIntersected.clear()
}

for (let item of carousel.elements.items)
  carousel_observer.observe(item)

carousel.elements.scroller.addEventListener('scrollend', () => {
  synchronize()
})

// next and previous click events
// TODO: don't use dom state so that multiple calls stack
const goNext = () => {
  if (carousel.current?.nextElementSibling) {
    let next = carousel.current.nextElementSibling
    next?.scrollIntoView({block: 'nearest', inline: 'nearest'})
    carousel.current = next
  }
  else {
    console.log('at the end')
  }
}

const goPrev = () => {
  if (carousel.current?.previousElementSibling) {
    let prev = carousel.current.previousElementSibling
    prev?.scrollIntoView({block: 'nearest', inline: 'nearest'})
    carousel.current = prev
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
    .scrollIntoView()
})

carousel.elements.root.addEventListener('keyup', e => {  
  switch (e.key) {
    case 'ArrowRight':
      if (e.target.closest('.gui-carousel--map'))
        carousel.elements
          .minimap.children[getElementIndex(e.target) + 1]
          ?.focus()
      else {
        if (document.activeElement === carousel.elements.next) {
          carousel.elements.next.animate([
            { outlineOffset: '5px' },
            { outlineOffset: '0' },
            { outlineOffset: '5px' },
          ], { duration: 145 }) 
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
          carousel.elements.previous.animate([
            { outlineOffset: '5px' },
            { outlineOffset: '0' },
            { outlineOffset: '5px' },
          ], { duration: 145 })
        }
        carousel.elements.previous.focus()
      }
      
      goPrev()
      break
  }
})

// marker factory
const createMarkerDot = ({index, type}) => {
  // <button class="gui-carousel--control" type="button" role="tab" aria-label="Item 1" title="Item 1" aria-controls="carousel-item-1"></button>
  const marker = document.createElement('button')
  marker.className = 'gui-carousel--control'
  marker.type = 'button'
  marker.role = 'tab'
  marker.title = `Item ${index}`
  marker.setAttribute('aria-label', `Item ${index}`)
  marker.setAttribute('aria-controls', `carousel-item-${index}`)
  return marker
}

const createMarkerGallery = ({index, type, item}) => {
  // <button class="gui-carousel--control --gallery" type="button" role="tab" aria-label="Item 1" title="Item 1" aria-controls="carousel-item-1"></button>
  const marker = document.createElement('button')
  marker.style.backgroundImage = `url(${item.querySelector('img').src})`
  marker.className = 'gui-carousel--control --gallery'
  marker.type = 'button'
  marker.role = 'tab'
  marker.title = `Item ${index}`
  marker.setAttribute('aria-label', `Item ${index}`)
  marker.setAttribute('aria-controls', `carousel-item-${index}`)
  return marker
}

const createMarker = (item, index) => {
  const markerType = carousel.elements.root.getAttribute('map-type')
  
  if (markerType == 'gallery')
    return createMarkerGallery({index, type: markerType, item})
  else
    return createMarkerDot({index, type: markerType})
}

// kickoff matching state to DOM
carousel.elements.items.forEach((item, index) => {
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