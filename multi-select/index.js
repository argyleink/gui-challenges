import 'https://unpkg.com/isotope-layout@3.0.6/dist/isotope.pkgd.min.js'

const IsotopeGrid = new Isotope( 'article', {
  itemSelector: 'span',
  layoutMode: 'fitRows',
  percentPosition: true
})
  
const filterGrid = query =>
  IsotopeGrid.arrange({filter: query})

// takes a <select> and returns the selection as an array
const prepareSelectOptions = element =>
  Array.from(element.selectedOptions).reduce((data, opt) => {
    data.push([opt.parentElement.label.toLowerCase(), opt.value])
    return data
  }, [])

// <select> watcher
document.querySelector('select').addEventListener('input', e => {
  let selectData = prepareSelectOptions(e.target)
  console.warn('Multiselect', selectData)

  // DEMO
  // isotope query assembly from checkbox selections
  let query = selectData.reduce((query, val) => {
    query.push('.' + val[1].split(' ').join('-'))
    return query
  }, []).join(',')

  filterGrid(query)
})

// <input type="checkbox"/> watcher
document
  .querySelectorAll('form input')
  .forEach(checkbox => {
    checkbox.addEventListener('input', e => {
      const formData = new FormData(document.querySelector('form'))
      console.warn('Checkboxes', Array.from(formData.entries()))

      // DEMO
      // isotope query assembly from checkbox selections
      let query = Array.from(formData.values()).reduce((query, val) => {
        query.push('.' + val.split(' ').join('-'))
        return query
      }, []).join(',')

      filterGrid(query)
    })  
  })
