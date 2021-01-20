import 'https://argyleink.github.io/scroll-timeline/dist/scroll-timeline.js'

const {matches:motionOK} = window.matchMedia(
  '(prefers-reduced-motion: no-preference)'
)

// grab and stash elements
const tabgroup     = document.querySelector('.tabs')
const tabsection   = tabgroup.querySelector(':scope > section')
const tabnav       = tabgroup.querySelector(':scope nav')
const tabnavitems  = tabnav.querySelectorAll(':scope a')
const tabindicator = tabgroup.querySelector(':scope .indicator')

if (motionOK) {
  // shared timeline for .indicator and nav > a colors
  const sectionScrollTimeline = new ScrollTimeline({
    scrollSource: tabsection,
    orientation: 'inline',
    fill: 'both',
  })

  // based on the scroll timeline position
  // move the indicator left/right on X to the links position
  // resize the indicator width based on the nav link's intrinsic size
  tabindicator.animate({ 
      transform: [...tabnavitems].map(({offsetLeft}) => 
        `translateX(${offsetLeft}px)`),
      width: [...tabnavitems].map(({offsetWidth}) => 
        `${offsetWidth}px`)
    }, {
      duration: 1000,
      fill: 'both',
      timeline: sectionScrollTimeline,
    }
  )

  // for each nav link
  // animate color based on the scroll timeline
  // color is active when its the current index
  tabnavitems.forEach(navitem => {
    navitem.animate({
        color: [...tabnavitems].map(item => 
          item === navitem
            ? `var(--text-active-color)`
            : `var(--text-color)`)
      }, {
        duration: 1000,
        fill: 'both',
        timeline: sectionScrollTimeline,
      }
    )
  })
}

const setActiveTab = tabbtn => {
  tabnav
    .querySelector(':scope a[active]')
    .removeAttribute('active')
  
  tabbtn.setAttribute('active', '')
  tabbtn.scrollIntoView()
}
 
const determineActiveTabSection = () => {
  const i = tabsection.scrollLeft / tabsection.clientWidth
  const matchingNavItem = tabnavitems[i]
  
  matchingNavItem && setActiveTab(matchingNavItem)
}

tabnav.addEventListener('click', e => {
  if (e.target.nodeName !== "A") return
  setActiveTab(e.target)
})

tabsection.addEventListener('scroll', () => {
  clearTimeout(tabsection.scrollEndTimer)               
  tabsection.scrollEndTimer = setTimeout(
    determineActiveTabSection
  , 100)
})

window.onload = () => {
  if (location.hash)
    tabsection.scrollLeft = document
      .querySelector(location.hash)
      .offsetLeft
    
  determineActiveTabSection()
}