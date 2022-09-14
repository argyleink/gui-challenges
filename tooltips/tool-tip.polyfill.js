if (!CSS.supports('selector(:has(*))')) {
  document.querySelectorAll('tool-tip').forEach(tooltip =>
    tooltip.parentNode.classList.add('has_tool-tip'))

  let styles = document.createElement('style')
  styles.textContent = `
    .has_tool-tip {
      position: relative;
    }
    .has_tool-tip:is(:hover, :focus-visible, :active) > tool-tip {
      opacity: 1;
      transition-delay: 200ms;
    }
  `
  document.head.appendChild(styles)
}