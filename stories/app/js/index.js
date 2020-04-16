const stories = document.querySelector('.stories')
let median = stories.offsetLeft + (stories.clientWidth / 2)

const navigateStories = (story, direction) => {
  const lastItemInUserStory = story.parentNode.firstElementChild
  const firstItemInUserStory = story.parentNode.lastElementChild
  const hasNextUserStory = story.parentElement.nextElementSibling
  const hasPrevUserStory = story.parentElement.previousElementSibling
  
  if (direction === 'next') {
    if (lastItemInUserStory === story && !hasNextUserStory)
      return
    else if (lastItemInUserStory === story && hasNextUserStory)
      story.parentElement.nextElementSibling.scrollIntoView({
        behavior: 'smooth'
      })
    else
      story.classList.add('seen')
  }
  else if(direction === 'prev') {
    if (firstItemInUserStory === story && !hasPrevUserStory)
      return
    else if (firstItemInUserStory === story && hasPrevUserStory)
      story.parentElement.previousElementSibling.scrollIntoView({
        behavior: 'smooth'
      })
    else
      story.nextElementSibling.classList.remove('seen')
  }
}

stories.addEventListener('click', e => {
  if (e.target.nodeName !== 'ARTICLE') 
    return
  
  navigateStories(e.target, 
    e.clientX > median 
      ? 'next' 
      : 'prev')
})