import 'https://argyleink.github.io/scroll-timeline/dist/scroll-timeline.js'

// grab and stash elements
const tabgroup     = document.querySelector('.tabs')
const tabsection   = tabgroup.querySelector(':scope > section')
const tabnav       = tabgroup.querySelector(':scope > nav')
const tabnavitems  = tabgroup.querySelectorAll(':scope > nav a')
const tabindicator = tabgroup.querySelector(':scope .indicator')

// based on the scroll timeline
// move the indicator left/right based on the nav link left
// resize the indicator width based on the nav link intrinsic size
// NOTE: this can't be done in CSS
tabindicator.animate(
  { 
    transform: [...tabnavitems].map(item => 
      `translateX(${item.offsetLeft}px)`),
    width: [...tabnavitems].map(item => 
      `${item.offsetWidth}px`)
  },
  {
    duration: 1000,
    fill: 'both',
    timeline: new ScrollTimeline({
      scrollSource: tabsection,
      orientation: 'inline',
      fill: 'both',
    })
  }
)

// for each nav link
// animate color based on the scroll timeline
// color is active when its the current index
// NOTE: this could be done in CSS
tabnavitems.forEach(navitem => {
  navitem.animate(
    {
      color: [...tabnavitems].map(item => 
        item === navitem
          ? `var(--text-active-color)`
          : `var(--text-color)`)
    },
    {
      duration: 1000,
      fill: 'both',
      timeline: new ScrollTimeline({
        scrollSource: tabsection,
        orientation: 'inline',
        fill: 'both',
      })
    }
  )
})

const setActiveTab = tabbtn => {
  document
    .querySelector('.tabs a[active]')
    .removeAttribute('active')
  
  tabbtn.setAttribute('active', '')
  tabbtn.scrollIntoView()
}
 
const determineActiveTabSection = () => {
  const i = tabsection.scrollLeft / tabsection.clientWidth
  const matchingNavItem = tabnavitems[i]
  matchingNavItem && setActiveTab(matchingNavItem)
}

// TODO: restore state from URL in nav items
determineActiveTabSection()

tabnav.addEventListener('click', e => {
  if (e.target.nodeName !== "A") return
  setActiveTab(e.target)
})

tabsection.addEventListener('scroll', () => {
  clearTimeout(tabsection.scrollEndTimer)               
  tabsection.scrollEndTimer = setTimeout(determineActiveTabSection, 100)
})