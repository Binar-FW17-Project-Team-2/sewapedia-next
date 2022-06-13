import { useState } from 'react'
import { Box, styled, Typography } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { addLastSeen } from '../redux/slices/lastSeenSlice'
import { errorToast, successToast } from '../redux/slices/toastSlice'
import {
  selectWishlist,
  addWishlist,
  deleteWishlist,
} from '../redux/slices/wishlistSlice'

export default function Card({ product, sx }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  function handleClick() {
    const payload = {
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img_url[0],
    }
    dispatch(addLastSeen(payload))
    router.push(`/products/${product.id}`)
  }

  return (
    <Box
      component="li"
      sx={{
        boxSizing: 'border-box',
        display: 'inline-block',
        ...sx,
        verticalAlign: 'top',
        paddingRight: '10px',
        paddingBottom: '20px',
        cursor: 'default',
      }}
    >
      <Box
        onClick={handleClick}
        sx={{
          boxSizing: 'border-box',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          sx={{
            position: 'relative',
            width: '100%',
            height: 0,
            pt: '100%',
            background: `url(${product.img_url[0]})`,
            backgroundSize: 'cover',
          }}
        >
          {open ? <Action product={product} /> : null}
        </Box>
        <Typography
          component="h1"
          variant="body1"
          mt={1}
          sx={{
            fontWeight: 600,
            color: '#333333',
            whiteSpace: 'pre-wrap',
          }}
        >
          {product.name}
        </Typography>
        <Typography
          component="h1"
          fontSize="18px"
          fontWeight="bold"
          color="primary"
          pb={2}
        >
          Rp.{product.price}
        </Typography>
      </Box>
    </Box>
  )
}

function Action({ product }) {
  const wishlist = useSelector(selectWishlist)
  const dispatch = useDispatch()
  const { data: session, status } = useSession()

  async function addToCart(e) {
    e.stopPropagation()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
      method: 'POST',
      body: JSON.stringify({
        productId: product.id,
        lamaSewa: 1,
        qty: 1,
      }),
      headers: {
        authorization: `Bearer ${session?.user.accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    if (res.status === 200) {
      dispatch(successToast(data.message))
    } else {
      dispatch(errorToast('gagal masuk ke ranjang'))
    }
  }

  async function removeToWishlist(e) {
    e.stopPropagation()
    if (status === 'loading') return
    dispatch(
      deleteWishlist({
        token: session.user.accessToken,
        userId: session.user.id,
        productId: product.id,
      })
    )
  }

  async function addToWishlist(e) {
    e.stopPropagation()
    if (status === 'loading') return
    dispatch(
      addWishlist({
        token: session.user.accessToken,
        product: product,
      })
    )
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '50%',
        right: '50%',
        transform: 'translate(50%, 50%)',
        padding: '5px',
        transition: '.5s',
      }}
    >
      {wishlist.data.some((val) => val.id === product.id) ? (
        <Btn onClick={removeToWishlist}>
          <FavoriteIcon sx={{ color: 'red' }} />
        </Btn>
      ) : (
        <Btn onClick={addToWishlist}>
          <FavoriteBorderOutlinedIcon sx={{ color: 'red' }} />
        </Btn>
      )}
      <Btn onClick={addToCart}>
        <AddShoppingCartIcon sx={{ color: 'white' }} />
      </Btn>
    </Box>
  )
}

const Btn = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50px',
  height: '50px',
  marginLeft: '5px',
  borderRadius: '50%',
  backgroundColor: `${theme.palette.primary.main}`,
  cursor: 'pointer',
}))
