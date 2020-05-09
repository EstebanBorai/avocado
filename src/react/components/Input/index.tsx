import * as React from 'react'
import './input.scss'

interface InputProps {
  type?: 'text' | 'number' | 'email'
  label: string
  name: string
  id?: string
  placeholder?: string
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps): JSX.Element => (
  <div id={props.id} className='input-wrapper'>
    <input
      className='input'
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  </div>
)

Input.defaultProps = {
  type: 'text',
  placeholder: ''
}

export default Input
