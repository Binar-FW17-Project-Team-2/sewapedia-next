import {
  Box,
  Button,
  CircularProgress,
  Container,
  styled,
  Typography,
} from '@mui/material'
import {
  successToast,
  warningToast,
  errorToast,
} from '../../redux/slices/toastSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { verifyToken } from '../../utils/tokenHandler'
import Layout from '../../components/Layout'

export async function getServerSideProps({ query }) {
  const payload = verifyToken(query.items)
  if (!payload)
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  return { props: { items: payload.items } }
}

export default function Checkout({ items }) {
  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          py: '15px',
        }}
      >
        <Container>
          {/* Alamat Pengiriman */}
          <Box
            sx={{
              height: '3px',
              width: '100%',
              backgroundPositionX: '-30px',
              backgroundSize: '116px 3px',
              backgroundImage: `repeating-linear-gradient(45deg, rgb(111, 166, 214), rgb(111, 166, 214) 33px, white 0px, white 41px, rgb(241, 141, 155) 0px, rgb(241, 141, 155) 74px, white 0px, white 82px)`,
            }}
          />
          <Content>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon color="primary" />
              <Typography
                color="primary"
                variant="h6"
                sx={{ verticalAlign: 'center' }}
              >
                Alamat Pengiriman
              </Typography>
              <Button color="secondary" sx={{ ml: 'auto', fontWeight: 'bold' }}>
                Ubah
              </Button>
            </Box>
            <Typography
              variant="body1"
              fontWeight="bold"
            >{`Nama Pelanggan (+62) 89688227070`}</Typography>
            <Typography variant="body1">{`Jl.Trengguli RT.03 RW.02 SUKOLILO, SURABAYA, JAWA TIMUR, ID 60111`}</Typography>
          </Content>

          {/* Produk Dipesan */}
          <Content>
            <Typography variant="h6" fontWeight="bold">
              Produk Dipesan
            </Typography>
            <Box
              sx={{
                borderTop: '1px solid #999',
              }}
            >
              {items.map((item) => (
                <ProdukDipesan item={item} key={item.id} />
              ))}
            </Box>
          </Content>

          {/* methode pembayaran */}
          <MethodePembayaran items={items} />
        </Container>
      </Box>
    </Layout>
  )
}

function ProdukDipesan({ item }) {
  const { productDetails: product } = item

  return (
    <Box
      sx={{
        display: 'inline-block',
        width: {
          xs: '100%',
          md: '49%',
        },
        py: '15px',
        mr: '1%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          pb: '10px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100px',
            height: '100px',
            flexShrink: 0,
            mr: 1,
            bgcolor: 'tomato',
          }}
        >
          <img
            src={product.img_url[0]}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
        <Box
          sx={{
            flexShrink: 1,
          }}
        >
          <Typography component="h1" fontWeight="bold" variant="body1">
            {product.name}
          </Typography>
          <Typography
            component="p"
            variant="body1"
          >{`Harga: Rp${product.price}`}</Typography>
          <Typography
            component="p"
            variant="body1"
          >{`Kuantitas: ${item.qty} buah`}</Typography>
          <Typography
            component="p"
            variant="body1"
          >{`Lama Sewa: ${item.lamaSewa} hari`}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          p: '10px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography>Subtotal:</Typography>
        <Typography color="primary">Rp{item.subTotalPrice},-</Typography>
      </Box>
    </Box>
  )
}

const Content = styled(Box)({
  boxSizing: 'border-box',
  width: '100%',
  padding: '25px 15px',
  marginBottom: '15px',
  backgroundColor: 'white',
})

function MethodePembayaran({ items }) {
  // const navigate = useNavigate();
  const dispatch = useDispatch()
  const [method, setMethod] = useState()
  const [loadingBtn, setLoadingBtn] = useState(false)
  const menuPayment = [
    {
      name: 'ambil sendiri',
      content: <AmbilSendiri key={1} />,
    },
    {
      name: 'cod (bayar dirumah)',
      content: null,
      disabled: true,
    },
    {
      name: 'transfer bank',
      disabled: true,
      content: null,
    },
  ]

  async function buatPesanan() {
    if (!method)
      return dispatch(warningToast('pilih methode pemabayaran dulu!!'))
    else if (!items.length)
      return dispatch(errorToast('maaf terjadi kesalahan'))
    else {
      setLoadingBtn(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order`,
        {
          method: 'POST',
          body: JSON.stringify({
            items: items.map((item) => item.id),
          }),
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      if (res.ok) {
        setLoadingBtn(false)
        // navigate('/');
        dispatch(successToast('pesanan telah dibuat silahkan cek email anda'))
      } else {
        setLoadingBtn(false)
        dispatch(errorToast('pesanan gagal!!'))
      }
    }
  }

  return (
    <Content>
      <Typography variant="h6" fontWeight="bold">
        Methode Pembayaran
      </Typography>
      <Box
        sx={{
          borderBottom: '1px solid #999',
          py: 2,
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        {menuPayment.map((menu) => (
          <MenuPayment
            useMethod={[method, setMethod]}
            {...menu}
            key={menu.name}
          />
        ))}
      </Box>
      {menuPayment
        .filter((menu) => menu.name === method)
        .map((menu) => menu.content)}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr max-content max-content',
          columnGap: '10px',
          fontSize: '13px',
        }}
      >
        <Box
          sx={{
            gridColumnStart: 2,
            height: '40px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Subtotal untuk Produk
        </Box>
        <Box
          sx={{
            gridColumnStart: 3,
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          Rp{items.reduce((total, item) => total + item.subTotalPrice, 0)}
        </Box>
        <Box
          sx={{
            gridColumnStart: 2,
            height: '40px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Ongkos Kirim
        </Box>
        <Box
          sx={{
            gridColumnStart: 3,
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          Rp.0
        </Box>
        <Box
          sx={{
            gridColumnStart: 2,
            height: '40px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Biaya Admin
        </Box>
        <Box
          sx={{
            gridColumnStart: 3,
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          Rp0
        </Box>
        <Box
          sx={{
            gridColumnStart: 2,
            height: '40px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Total Pembayaran
        </Box>
        <Box
          sx={{
            gridColumnStart: 3,
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="h5" color="primary" fontWeight="bold">
            Rp{items.reduce((total, item) => total + item.subTotalPrice, 0)}
          </Typography>
        </Box>
        <Box
          sx={{
            gridColumnStart: 2,
            gridColumnEnd: 4,
            height: '40px',
            pt: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            onClick={loadingBtn ? null : buatPesanan}
            variant="contained"
            startIcon={
              loadingBtn ? (
                <CircularProgress color="inherit" size="14px" />
              ) : null
            }
          >
            Buat Pesanan
          </Button>
        </Box>
      </Box>
    </Content>
  )
}

function MenuPayment({ name, disabled, useMethod }) {
  const [method, setMethod] = useMethod

  return (
    <Button
      onClick={() => {
        setMethod(name)
      }}
      variant="outlined"
      size="small"
      disabled={disabled ?? false}
      color="inherit"
      sx={{
        padding: '4px 12px',
        borderWidth: '1px',
        borderRadius: '6px',
        borderColor: method === name ? 'green' : 'rgba(0,0,0,.12)',
      }}
    >
      {name}
    </Button>
  )
}

function AmbilSendiri() {
  return (
    <Box sx={{ borderBottom: '1px solid #999', py: 2 }}>
      <Typography>ambil sendiri di toko dengan menunjukkan id order</Typography>
    </Box>
  )
}
