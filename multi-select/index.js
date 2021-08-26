document.querySelector('select').addEventListener('input', e => {
  Array.from(e.target.selectedOptions).forEach(({ name, value }) => {
    console.log({name, value})
  })
})

document
  .querySelectorAll('form input')
  .forEach(checkbox => {
    checkbox.addEventListener('input', e => {
      let formData = new FormData(document.querySelector('form'))
      for (let entry of formData.entries())
        console.log(entry)
    })  
  })
  
