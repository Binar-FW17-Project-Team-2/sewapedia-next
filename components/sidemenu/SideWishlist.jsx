import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectWishlist } from '../../redux/slices/wishlistSlice'
import Card from './Card'

export default function Wishlist() {
  const router = useRouter()
  const wishlist = useSelector(selectWishlist)

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      <Typography
        onClick={() => router.push('/wishlist')}
        sx={{
          p: '15px',
          borderBottom: '1px solid #e5e7ea',
          cursor: 'pointer',
        }}
      >
        {`Wishlist (${wishlist?.data.length ?? 0})`}
      </Typography>
      {wishlist?.data.length ? (
        wishlist.data.map((value) => <Card product={value} key={value.id} />)
      ) : (
        <Typography p="15px">Tidak Ada</Typography>
      )}
    </Box>
  )
}
