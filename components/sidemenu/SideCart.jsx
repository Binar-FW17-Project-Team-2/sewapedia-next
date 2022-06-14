import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectCart } from '../../redux/slices/cartSlice'
import Card from './Card'

export default function Cart() {
  const router = useRouter()
  const cart = useSelector(selectCart)

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      <Typography
        onClick={() => router.push('/cart')}
        sx={{
          p: '15px',
          borderBottom: '1px solid #e5e7ea',
          cursor: 'pointer',
        }}
      >
        {`Cart (${cart?.length ?? 0})`}
      </Typography>
      {cart.length ? (
        cart.map((value) => (
          <Card product={value.productDetails} key={value.productDetails.id} />
        ))
      ) : (
        <Typography p="15px">Tidak Ada</Typography>
      )}
    </Box>
  )
}
