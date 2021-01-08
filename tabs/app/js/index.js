import 'https://argyleink.github.io/scroll-timeline/dist/scroll-timeline.js'

const tabgroup     = document.querySelector('.tabs')
const tabsection   = tabgroup.querySelector(':scope > section')
const tabnav       = tabgroup.querySelector(':scope > nav')
const tabnavitems  = tabgroup.querySelectorAll(':scope > nav a')
const tabindicator = tabgroup.querySelector(':scope .indicator')

tabindicator.animate(
  { 
    transform: [...tabnavitems].map(item => 
      `translateX(${item.offsetLeft}px)`),
    width: [...tabnavitems].map(item => 
      `${item.offsetWidth}px`),
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