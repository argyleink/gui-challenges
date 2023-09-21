const $deets = document.querySelectorAll('details')

openall.onclick = e =>
  $deets.forEach($deet =>
    $deet.setAttribute('open', ''))

closeall.onclick = e =>
  $deets.forEach($deet =>
    $deet.removeAttribute('open'))