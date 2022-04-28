import '../../switch/index.js'
import '../../switch/style.css'

export default {
  title: 'Switch',
  argTypes: {
    text: { control: 'text' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    vertical: { control: 'boolean' },
    active: { control: 'color' },
    padding: { control: 'text' },
    height: {
      control: { type: 'select' },
      options: ['default', 'small', 'medium', 'large'],
      mapping: {
        'default': '', 
        'small': '15px', 
        'medium': '1.5rem', 
        'large': '3rem',
      },
    },
    width: {
      control: { type: 'select' },
      options: ['default', 'short', 'medium', 'long'],
      mapping: {
        'default': '', 
        'short': '3.5rem', 
        'medium': '5rem', 
        'long': '10rem',
      }
    },
  },
}

const Template = args => {
  const swx = document.createElement('label')
  swx.setAttribute('for', 'switch-1')
  swx.classList.add('gui-switch')
  swx.classList.toggle('-vertical', args.vertical === true)
  swx.textContent = args.text || 'Default'
  args.active && swx.style.setProperty('--track-active', args.active)
  args.height && swx.style.setProperty('--thumb-size', args.height)
  args.width && swx.style.setProperty('--track-size', args.width)
  args.padding && swx.style.setProperty('--track-padding', args.padding)

  const cbx = document.createElement('input')
  cbx.setAttribute('type', 'checkbox')
  cbx.setAttribute('role', 'switch')
  cbx.setAttribute('id', 'switch-1')
  cbx.checked = args.checked
  cbx.indeterminate = args.indeterminate
  cbx.disabled = args.disabled

  swx.appendChild(cbx)

  return swx
}

export const Basic = Template.bind({})
Basic.args = {
  text: 'Basic',
  checked: true,
}

export const Indeterminate = Template.bind({})
Indeterminate.args = {
  text: 'Indeterminate',
  indeterminate: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  text: 'Disabled',
  disabled: true,
}

export const DisabledChecked = Template.bind({})
DisabledChecked.args = {
  text: 'Disabled (checked)',
  disabled: true,
  checked: true,
}

export const Vertical = Template.bind({})
Vertical.args = {
  text: 'Vertical',
  checked: true,
  vertical: true,
}

export const CustomColor = Template.bind({})
CustomColor.args = {
  text: 'Custom Color',
  checked: true,
  active: 'hotpink',
}