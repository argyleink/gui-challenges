const getStyle = (element, prop) => {
  return parseInt(
    window.getComputedStyle(element)
      .getPropertyValue(prop)
  )
}

const getPseudoStyle = (element, prop) => {
  return parseInt(
    window.getComputedStyle(element, ':before')
      .getPropertyValue(prop)
  )
}

export {
  getStyle,
  getPseudoStyle,
}