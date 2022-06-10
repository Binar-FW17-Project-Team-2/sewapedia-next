import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  Typography,
  Pagination as PaginationTab,
} from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Star } from '@mui/icons-material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import InputNumber from '../../components/InputNumber'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { errorToast, successToast } from '../../redux/slices/toastSlice'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { createToken } from '../../utils/tokenHandler'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:4000/api/v1/product/${params.id}`)
  const product = await res.json()
  return { props: { product } }
}

export default function ProductDetails({ product }) {
  const [qty, setQty] = useState(1)
  const [lamaSewa, setLamaSewa] = useState(1)
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const router = useRouter()

  async function addToCart() {
    if (!session?.user.id) return router.push('/auth/signin')
    const res = await fetch(`http://localhost:4000/api/v1/cart`, {
      method: 'POST',
      body: JSON.stringify({
        productId: product.id,
        lamaSewa: 1,
        qty: 1,
      }),
      headers: {
        'Content-Type': 'application/json',
        access_token: session?.user.accessToken,
      },
    })
    const data = await res.json()
    res.ok
      ? dispatch(successToast(data.message))
      : dispatch(errorToast('gagal masuk keranjang'))
  }

  async function sewaSekarang() {
    if (!session?.user.id) return router.push('/auth/signin')
    const res = await fetch('http://localhost:4000/api/v1/order/item', {
      method: 'POST',
      body: JSON.stringify({ productId: product.id, qty, lamaSewa }),
      headers: {
        'Content-Type': 'application/json',
        access_token: session?.user.accessToken,
      },
    })
    const data = await res.json()
    if (res.ok) {
      const items = createToken({ items: [data] }, 24 * 60 * 60)
      router.push(`/checkout?items=${items}`)
    } else {
      dispatch(errorToast('maaf terjadi kesalahan'))
    }
  }

  return (
    <Layout>
      <Container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'start',
          py: '50px',
        }}
      >
        {/* Image */}
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '80%',
              lg: '430px',
            },
            margin: 'auto',
          }}
        >
          <Swiper
            pagination={{
              type: 'fraction',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {product?.img_url?.map((image, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '100%',
                  }}
                >
                  <Image src={image} alt={idx} layout="fill" priority="true" />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
          <Box
            sx={{
              py: '15px',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
                width: '50%',
                gap: '4px',
              }}
            >
              <Typography color="primary" variant="body1">
                4.4
              </Typography>
              <Rating
                value={4.4}
                precision={0.1}
                readOnly
                icon={<Star fontSize="inherit" color="primary" />}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end',
                boxSizing: 'border-box',
                width: '50%',
                borderLeft: '1px solid #e9e9e9',
              }}
            >
              <FavoriteBorderOutlinedIcon color="error" />
              <Typography ml="2px">{`Favorite (23RB)`}</Typography>
            </Box>
          </Box>
        </Box>

        {/* CTA */}
        <Box
          sx={{
            boxSizing: 'border-box',
            flex: 1,
            ml: {
              xs: 0,
              lg: '60px',
            },
            whiteSpace: 'pre-wrap',
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontWeight: '600',
              fontSize: '20px',
              lineHeight: '24px',
              marginBottom: '5px',
            }}
          >
            {product?.name}
          </Typography>
          <Box
            sx={{
              boxSizing: 'border-box',
              width: '100%',
              p: '15px 20px',
              backgroundColor: '#fafafa',
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              fontWeight="bold"
              color="primary"
            >
              Rp{product?.price},-
            </Typography>
          </Box>

          <Box
            sx={{
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              p: '15px 20px',
            }}
          >
            <Typography sx={{ width: '110px' }}>Kuantitas</Typography>
            <InputNumber
              useValue={[qty, setQty]}
              min={1}
              max={product?.stock}
            />
            <Typography ml={2}>/ {product?.stock}</Typography>
          </Box>
          <Box
            sx={{
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              p: '15px 20px',
            }}
          >
            <Typography sx={{ width: '110px' }}>Lama Sewa</Typography>
            <InputNumber
              useValue={[lamaSewa, setLamaSewa]}
              min={1}
              max={2500}
            />
            <Typography ml={2}>hari</Typography>
          </Box>
          <Box
            sx={{
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              p: '15px 20px',
              backgroundColor: '#fafafa',
            }}
          >
            <Typography>Jumlah Total</Typography>
            <Typography
              component="h1"
              variant="h6"
              fontWeight="bold"
              color="primary"
            >
              Rp{qty * lamaSewa * product?.price ?? 0},-
            </Typography>
          </Box>
          <Box
            sx={{
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              p: '15px 20px',
            }}
          >
            <Button
              onClick={addToCart}
              variant="outlined"
              sx={{
                width: '49%',
              }}
            >
              Masukkan Keranjang
            </Button>
            <Button
              onClick={sewaSekarang}
              variant="contained"
              sx={{
                width: '49%',
              }}
            >
              Sewa Sekarang
            </Button>
          </Box>
        </Box>

        {/* Deskripsi */}
        <Box
          sx={{
            width: '100%',
            mt: '30px',
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            sx={{
              padding: '15px',
              backgroundColor: '#fafafa',
            }}
          >
            Deskripsi Produk
          </Typography>
          <Typography
            component="p"
            variant="body2"
            sx={{
              padding: '15px',
            }}
          >
            {product?.details}
          </Typography>
        </Box>

        {/* Penilaian */}
        <Box
          sx={{
            width: '100%',
            mt: '30px',
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            sx={{
              padding: '15px',
              backgroundColor: '#fafafa',
            }}
          >
            Penilaian Produk
          </Typography>
          <Box p="15px">
            <Box>
              <Penilaian />
              <Penilaian />
              <Penilaian />
              <Penilaian />
            </Box>
            <Stack mt={2} spacing={2} alignItems="end">
              <PaginationTab count={8} color="primary" size="small" />
            </Stack>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

function Penilaian() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
        py: '24px',
        borderBottom: '1px solid rgba(0,0,0,0.2)',
      }}
    >
      <Box
        sx={{
          display: {
            xs: 'none',
            sm: 'flex',
          },
          flexWrap: 'nowrap',
          width: {
            xs: '50%',
            sm: '35%',
            md: '25%',
          },
        }}
      >
        <Profil name="Pelanggan" />
      </Box>
      <Box
        sx={{
          width: {
            xs: 'auto',
            md: '50%',
          },
        }}
      >
        {/* review pelanggan XS -> SM*/}
        <Box
          sx={{
            display: {
              xs: 'flex',
              sm: 'none',
            },
            p: '8px',
          }}
        >
          <Profil name="Pelanggan" reply="comentar dari pelanggan" rating={4} />
        </Box>
        {/* review pelanggan >= SM  */}
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
            },
          }}
        >
          <Rating value={4} readOnly size="small" />
          <Typography component="p" variant="body2" color="grey">
            comentar dari pelanggan!!!!
          </Typography>
        </Box>
        {/* Reply Admin */}
        <Box
          sx={{
            display: 'flex',
            p: '8px',
            mt: '15px',
            backgroundColor: '#F3F4F5',
            borderRadius: '16px',
          }}
        >
          <Profil
            name="Admin"
            reply="terimakasih telah berbelanja di toko kami"
          />
        </Box>
      </Box>
    </Box>
  )
}

function Profil({ name, reply, rating }) {
  return (
    <>
      <Box
        sx={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,.2)',
        }}
      ></Box>
      <Box
        sx={{
          pl: '15px',
          alignSelf: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="body1"
          color="primary"
          fontWeight="bold"
        >
          {name}
        </Typography>
        <Typography component="p" variant="body2" color="lightgrey">
          20 januari 2022
        </Typography>
        {rating ? <Rating value={rating} readOnly size="small" /> : null}
        {reply ? (
          <Typography component="p" variant="body2" color="grey">
            {reply}
          </Typography>
        ) : null}
      </Box>
    </>
  )
}
