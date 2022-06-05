import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Image from 'next/image'

function SideCard({ product }) {
  const router = useRouter()
  const dispatch = useDispatch()

  function clickProduct() {
    const payload = {
      id: product.id,
      img: product.img,
      name: product.name,
      price: product.price,
    }
    dispatch(addLastSeen(payload))
    router.push(`/products/${product.id}`)
  }

  return (
    <Box
      onClick={clickProduct}
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        height: '85px',
        p: '10px',
        borderBottom: '1px solid #e5e7ea',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          float: 'left',
          width: '65px',
          height: '65px',
          marginRight: '5px',
          backgroundColor: 'tomato',
        }}
      >
        <Image src={product.img} alt={product.name} layout="fill" />
      </Box>
      <Typography
        width="calc(100% - 70px)"
        pt="15px"
        fontSize="13px"
        lineHeight="14px"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {product.name}
      </Typography>
      <Typography color="primary" variant="body1" fontWeight="bold">
        {product.price}
      </Typography>
    </Box>
  )
}
