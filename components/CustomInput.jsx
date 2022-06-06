import { TextField } from '@mui/material'
import { useField } from 'formik'

export function TextInput(props) {
  const [field, meta] = useField(props)
  return (
    <TextField
      {...field}
      {...props}
      {...(meta.touched && meta.error
        ? { error: true, helperText: meta.error }
        : undefined)}
    />
  )
}
