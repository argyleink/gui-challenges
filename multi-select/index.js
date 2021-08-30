import 'https://unpkg.com/isotope-layout@3.0.6/dist/isotope.pkgd.min.js'

const IsotopeGrid = new Isotope( 'article', {
  itemSelector: 'span',
  layoutMode: 'fitRows',
  percentPosition: true
})

document.querySelector('select').addEventListener('input', e => {
  let selectData = Array.from(e.target.selectedOptions).reduce((data, opt) => {
    data.push([opt.parentElement.label, opt.value])
    return data
  }, [])
  console.info(selectData)

  // isotope query assembly from checkbox selections
  let query = selectData.reduce((query, val) => {
    query.push('.' + val[1].split(' ').join('-'))
    return query
  }, [])

  filterGrid(query.join(','))
})

document
  .querySelectorAll('form input')
  .forEach(checkbox => {
    checkbox.addEventListener('input', e => {
      const formData = new FormData(document.querySelector('form'))
      console.info(Array.from(formData.entries()))

      // isotope query assembly from checkbox selections
      let query = Array.from(formData.values()).reduce((query, val) => {
        query.push('.' + val.split(' ').join('-'))
        return query
      }, [])

      filterGrid(query.join(','))
    })  
  })
  
const filterGrid = query =>
  IsotopeGrid.arrange({filter: query})
