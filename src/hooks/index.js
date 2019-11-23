import { useState } from 'react'

export const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clean = () => {
    setValue('')
  }

  return {
    clean,
    props: {
      type,
      name,
      value,
      onChange,
    }
  }
}
