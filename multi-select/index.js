document.querySelector('select').addEventListener('input', e => {
  let selectData = Array.from(e.target.selectedOptions).reduce((data, opt) => {
    data.push([opt.parentElement.label, opt.value])
    return data
  }, [])
  console.info(selectData)
})

document
  .querySelectorAll('form input')
  .forEach(checkbox => {
    checkbox.addEventListener('input', e => {
      const formData = new FormData(document.querySelector('form'))
      console.info(Array.from(formData.entries()))
    })  
  })
  
