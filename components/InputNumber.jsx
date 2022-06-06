import { Box, Button, TextField } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

export default function InputNumber({ sx, min, max, useValue }) {
  const [value, setValue] = useValue

  function increment() {
    setValue((prev) => (prev < max ? prev + 1 : prev))
  }
  function decrement() {
    setValue((prev) => (prev > min ? prev - 1 : prev))
  }
  function handleBlur(e) {
    const value = ~~e.target.value
    if (min !== undefined && value < min) setValue(min)
    else if (max !== undefined && value > max) setValue(max)
    else setValue(value)
  }
  function handleChange({ target }) {
    if (target.value !== '') setValue(~~target.value)
    else setValue('')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        ...sx,
        alignItems: 'center',
      }}
    >
      <Button
        onClick={decrement}
        variant="outlined"
        sx={{
          boxSizing: 'border-box',
          minWidth: 0,
          height: '35px',
          px: '5px',
          mr: '-1px',
          border: '1px solid #b3b3b3',
          borderRadius: 0,
          '&:hover': {
            border: '1px solid black',
            zIndex: 2000,
          },
        }}
      >
        <RemoveIcon sx={{ color: 'black' }} />
      </Button>
      <TextField
        type="number"
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        sx={{
          boxSizing: 'border-box',
          height: '35px',
          width: '60px',
          verticalAlign: 'center',
          '&:hover': {
            zIndex: 2000,
          },
          '& div': {
            boxSizing: 'border-box',
            height: '100%',
            borderRadius: 0,
          },
          '& input': {
            border: '1px solid #e9e9e9',
            padding: '5px',
            textAlign: 'center',
            MozAppearance: 'textField',
          },
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
            {
              WebkitAppearance: 'none',
              margin: 0,
            },
        }}
      />
      <Button
        onClick={increment}
        variant="outlined"
        sx={{
          boxSizing: 'border-box',
          minWidth: 0,
          height: '35px',
          px: '5px',
          ml: '-1px',
          border: '1px solid #b3b3b3',
          borderRadius: 0,
          '&:hover': {
            border: '1px solid black',
          },
        }}
      >
        <AddIcon sx={{ color: 'black' }} />
      </Button>
    </Box>
  )
}
