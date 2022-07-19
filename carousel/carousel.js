import 'https://cdn.jsdelivr.net/gh/argyleink/scrollyfills@latest/dist/scrollyfills.modern.js'

export default class Carousel {
  constructor(element) {
    this.elements = { 
      root:     element,
      scroller: element.querySelector('.gui-carousel--scroller'),
      items:    element.querySelectorAll('.gui-carousel--scroll-item'),
      snaps:    element.querySelectorAll('.gui-carousel--snap'),
      previous: element.querySelector('.gui-carousel--control.--previous'),
      next:     element.querySelector('.gui-carousel--control.--next'),
      minimap:  element.querySelector('.gui-carousel--map'),
    }
    this.current = undefined
    this.hasIntersected = new Set()

    this.carousel_observer = new IntersectionObserver(observations => {
      for (let node of observations)
        this.hasIntersected.add(node)
    }, { 
      root: this.elements.scroller
    })

    this.#listen()
    // todo: observe this element being removed from DOM and #unlisten

    this.elements.snaps.forEach((item, index) => {
      this.hasIntersected.add({
        isIntersecting: index === 0,
        target: item,
      })
      
      this.elements.minimap
        .appendChild(this.#createMarker(item, index))

      item
        .querySelector('.gui-carousel--scroll-item')
        .setAttribute('aria-label', `${index+1} of ${this.elements.items.length}`)
      
      if (index === 0)
        this.current = item
    })

    this.synchronize({scrollPaginationIn: false})
  }

  synchronize({scrollPaginationIn = true}) {
    for (let observation of this.hasIntersected) {
      // toggle class based on if it's currently intersecting
      observation.target.classList
        .toggle('--in-view', observation.isIntersecting)
      
      // toggle inert when it's not intersecting
      observation.target
        .toggleAttribute('inert', !observation.isIntersecting)
      
      // toggle aria-selected on pagination dots
      const dot = this.elements.minimap
        .children[this.#getElementIndex(observation.target)]
      
      dot.setAttribute('aria-selected', observation.isIntersecting)
      dot.setAttribute('tabindex', !observation.isIntersecting ? '-1' : '0')

      // stash the intersecting snap element
      if (observation.isIntersecting) {
        this.current = observation.target
        if (scrollPaginationIn)
          dot.scrollIntoView({inline: 'center', block: 'nearest'})
      }
    }
    
    this.toggleControlsDisability()
    this.hasIntersected.clear()
  }

  goNext() {
    const next = this.current?.nextElementSibling

    if (this.current === next)
      return

    if (next) {
      // this.elements.scroller.scrollBy(20, 0)
      next.scrollIntoView({block: 'nearest', inline: 'nearest'})
      this.current = next
    }
    else {
      console.log('at the end')
    }
  }

  goPrev() {
    const previous = this.current?.previousElementSibling

    if (this.current === previous)
      return

    if (previous) {
      // this.elements.scroller.scrollBy(-20, 0)
      previous.scrollIntoView({block: 'nearest', inline: 'nearest'})
      this.current = previous
    }
    else {
      console.log('at the beginning')
    }
  }

  toggleControlsDisability() {
    let {lastElementChild:last, firstElementChild:first} = this.elements.scroller
    
    let isAtEnd =   this.current === last
    let isAtStart = this.current === first

    // before we possibly disable a button
    // shift the focus to the complimentary button
    if (document.activeElement === this.elements.next && isAtEnd)
      this.elements.previous.focus()
    else if (document.activeElement === this.elements.previous && isAtStart)
      this.elements.next.focus()

    this.elements.next.toggleAttribute('disabled', isAtEnd)
    this.elements.previous.toggleAttribute('disabled', isAtStart)
  }

  #listen() {
    // observe children intersection
    for (let item of this.elements.snaps)
      this.carousel_observer.observe(item)

    // scrollend listener for sync
    this.elements.scroller.addEventListener('scrollend', this.synchronize.bind(this))
    this.elements.next.addEventListener('click', this.goNext.bind(this))
    this.elements.previous.addEventListener('click', this.goPrev.bind(this))
    this.elements.minimap.addEventListener('click', this.#handlePaginate.bind(this))
    this.elements.root.addEventListener('keydown', this.#handleKeydown.bind(this))
  }

  #unlisten() {
    for (let item of this.elements.snaps)
      this.carousel_observer.unobserve(item)

    this.elements.scroller.removeEventListener('scrollend', this.synchronize)
    this.elements.next.removeEventListener('click', this.goNext)
    this.elements.previous.removeEventListener('click', this.goPrev)
    this.elements.minimap.removeEventListener('click', this.#handlePaginate)
    this.elements.root.removeEventListener('keydown', this.#handleKeydown)
  }

  #handlePaginate(e) {
    if (e.target.classList.contains('gui-carousel--map'))
      return

    e.target.setAttribute('aria-selected', true)
    this.elements
      .items[this.#getElementIndex(e.target)]
      .scrollIntoView({block: 'nearest', inline: 'nearest'})
  }

  #handleKeydown(e) {
    switch (e.key) {
      case 'ArrowRight':
        if (e.target.closest('.gui-carousel--map'))
          this.elements
            .minimap.children[this.#getElementIndex(e.target) + 1]
            ?.focus()
        else {
          if (document.activeElement === this.elements.next) {
            this.elements.next.style.animation = 'gui-carousel--control-keypress 145ms var(--ease-2)'
            this.elements.next.addEventListener('animationend', e => {
              this.elements.next.style.animation = null
            }, {once: true})
          }
          this.elements.next.focus()  
        }
        this.goNext()
        e.preventDefault()
        break
      case 'ArrowLeft':
        if (e.target.closest('.gui-carousel--map'))
          this.elements
            .minimap.children[this.#getElementIndex(e.target) - 1]
            ?.focus()
        else {
          if (document.activeElement === this.elements.previous) {
            this.elements.previous.style.animation = 'gui-carousel--control-keypress 145ms var(--ease-2)'
            this.elements.previous.addEventListener('animationend', e => {
              this.elements.previous.style.animation = null
            }, {once: true})
          }
          this.elements.previous.focus()
        }
        this.goPrev()
        e.preventDefault()
        break
    }
  }

  #getElementIndex(element) {
    let index = 0
    while (element = element.previousElementSibling)
      index++
    return index
  }

  #createMarker(item, index) {
    const markerType = this.elements.root.getAttribute('carousel-pagination')
    index++ // user facing index shouldnt start at 0
    
    if (markerType == 'gallery')
      return this.#createMarkerGallery({index, type: markerType, item})
    else
      return this.#createMarkerDot({index, type: markerType, item})
  }

  #createMarkerDot({index, type, item}) {
    const marker = document.createElement('button')
    const img = item.querySelector('img')
    marker.className = 'gui-carousel--control'
    marker.type = 'button'
    marker.role = 'tab'
    marker.title = `Item ${index}: ${img.alt}`
    marker.setAttribute('aria-label', img.alt)
    marker.setAttribute('aria-setsize', this.elements.items.length)
    marker.setAttribute('aria-posinset', index)
    marker.setAttribute('aria-controls', `carousel-item-${index}`)
    return marker
  }

  #createMarkerGallery({index, type, item}) {
    const marker = document.createElement('button')
    const img = item.querySelector('img')
    marker.style.backgroundImage = `url(${img.src})`
    marker.className = 'gui-carousel--control --gallery'
    marker.type = 'button'
    marker.role = 'tab'
    marker.title = `Item ${index}: ${img.alt}`
    marker.setAttribute('aria-label', img.alt)
    marker.setAttribute('aria-setsize', this.elements.items.length)
    marker.setAttribute('aria-posinset', index)
    marker.setAttribute('aria-controls', `carousel-item-${index}`)
    return marker
  }
}