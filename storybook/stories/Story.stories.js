import {Story} from '../../stories/app/js/index.js'
import '../../stories/app/css/index.css'

export default {
  title: 'Stories',
}

const Template = args => {
  const component = document.createElement('div')
  component.classList.add('stories')

  component.insertAdjacentHTML('afterbegin', `
    <section class="user">
      <article class="story" style="--bg: url(https://picsum.photos/480/840)"></article> 
      <article class="story" style="--bg: url(https://picsum.photos/480/841)"></article>
    </section>
    <section class="user">
      <article class="story" style="--bg: url(https://picsum.photos/481/840)"></article>
    </section>
    <section class="user">
      <article class="story" style="--bg: url(https://picsum.photos/481/841)"></article>
    </section>
    <section class="user">
      <article class="story" style="--bg: url(https://picsum.photos/482/840)"></article>
      <article class="story" style="--bg: url(https://picsum.photos/482/843)"></article>
      <article class="story" style="--bg: url(https://picsum.photos/482/844)"></article>
    </section>
  `)

  Story(component)
  return component
}

export const Default = Template.bind({})
Default.args = {}