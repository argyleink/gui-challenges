const getStyle = (element, prop) =>
  parseInt(
    window.getComputedStyle(element)
      .getPropertyValue(prop))

const getPseudoStyle = (element, prop) =>
  parseInt(
    window.getComputedStyle(element, ':before')
      .getPropertyValue(prop))

export {
  getStyle,
  getPseudoStyle,
}