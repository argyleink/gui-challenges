const rangeToPercent = slider => {
  const value = slider.value
  const max = slider.getAttribute('max') || 10
  const percent = value / max * 100

  return `${parseInt(percent)}%`
}

const sliders = document.querySelectorAll('input[type="range"]')

sliders.forEach(slider => {
  slider.style.setProperty('--track-fill', rangeToPercent(slider))

  slider.addEventListener('input', e => {
    e.target.style.setProperty('--track-fill', rangeToPercent(e.target))
  })
})