import { Box, Button, Checkbox, Container, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useEffect, useRef, useState } from 'react'
import InputNumber from '../../components/InputNumber'
import Layout from '../../components/Layout'
import { useDispatch } from 'react-redux'
import { errorToast } from '../../redux/slices/toastSlice'
import { getToken } from 'next-auth/jwt'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { createToken } from '../../utils/tokenHandler'

export async function getServerSideProps({ req }) {
  const token = await getToken({ req })
  if (!token)
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    headers: { authorization: `Bearer ${token?.accessToken}` },
  })
  const fallbackData = await res.json()
  return { props: { fallbackData } }
}

export default function Cart({ fallbackData }) {
  const [items, setItems] = useState(fallbackData)
  const [checked, setChecked] = useState([])
  const dispath = useDispatch()
  const router = useRouter()
  const { data: session } = useSession()

  function pilihSemua(e) {
    if (e.target.checked) {
      const checked = items.map((item) => item.id)
      return setChecked(checked)
    }
    setChecked([])
  }

  function hapusItems() {
    if (checked.length > 0) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
        method: 'DELETE',
        body: JSON.stringify({ id: checked }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${session?.user.accessToken}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          setItems((prev) =>
            prev.filter(
              (item) => item.id !== checked.find((id) => id === item.id)
            )
          )
          setChecked([])
        }
      })
    } else {
      dispath(errorToast('pilih item terlebih dahulu'))
    }
  }

  function checkout() {
    if (!checked.length) {
      return dispath(errorToast('pilih item yg mau dicheckout!!'))
    }
    const data = items.filter(
      (item) => item.id === checked.find((id) => id === item.id)
    )
    const payload = createToken({ items: data }, 24 * 60 * 60)
    router.push(`/checkout?items=${payload}`)
  }

  return (
    <Layout>
      <Container sx={{ py: '50px' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '32px',
            fontWeight: '800',
            letterSpacing: '-0.5px',
            color: '#333',
            pb: '50px',
          }}
        >
          Keranjang
        </Typography>
        <Table>
          <Thead>
            <tr>
              <Th>
                <Checkbox
                  onChange={pilihSemua}
                  color="primary"
                  sx={{ p: 0 }}
                  checked={items?.length === checked.length ? true : false}
                />
              </Th>
              <Th>Produk</Th>
              <Th>Harga</Th>
              <Th>Kuantitas</Th>
              <Th>Lama Sewa</Th>
              <Th>Total</Th>
            </tr>
          </Thead>
          <tbody>
            {items.map((item) => (
              <Item
                key={item.id}
                order={item}
                useChecklist={{ checked, setChecked }}
                setItems={setItems}
              />
            ))}
          </tbody>
        </Table>
        <Box
          sx={{
            zIndex: 2,
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: 'start',
            },
            flexWrap: 'wrap',
            position: 'sticky',
            bottom: 0,
            mt: '20px',
            width: '100%',
            p: '15px',
            backgroundColor: 'white',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: '-20px',
              left: 0,
              height: '20px',
              width: '100%',
              background: 'linear-gradient(transparent, rgba(0,0,0,.06))',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
            <Checkbox
              onChange={pilihSemua}
              checked={items.length === checked.length ? true : false}
            />
            <Typography>Pilih Semua</Typography>
          </Box>
          <Button
            onClick={hapusItems}
            variant="outlined"
            color="error"
            sx={{ mr: { sm: 'auto' } }}
          >
            Hapus
          </Button>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              mt: { xs: '10px', sm: 0 },
              pl: 1,
            }}
          >
            <Typography color="primary" variant="h6" fontWeight="bold">
              Rp{items.reduce((total, item) => total + item.subTotalPrice, 0)},-
            </Typography>
            <Button onClick={checkout} variant="contained">
              Checkout
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

function Item({ order, useChecklist, setItems }) {
  const { checked, setChecked } = useChecklist
  const [qty, setQty] = useState(order.qty)
  const [lamaSewa, setLamaSewa] = useState(order.lamaSewa)
  const { data: session } = useSession()

  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === order.id) {
          return {
            ...item,
            qty,
            lamaSewa,
            subTotalPrice: qty * lamaSewa * item.productDetails.price,
          }
        }
        return item
      })
    )
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
      method: 'PUT',
      body: JSON.stringify({
        productId: order.productId,
        qty,
        lamaSewa,
      }),
      headers: {
        authorization: `Bearer ${session?.user.accessToken}`,
        'Content-Type': 'application/json',
      },
    })
  }, [qty, lamaSewa])

  function pilih(e) {
    if (e.target.checked) {
      setChecked((prev) => [...prev, order.id])
    } else {
      setChecked((prev) => prev.filter((v) => v !== order.id))
    }
  }

  return (
    <Tr>
      <Td data-th="Checklist">
        <Checkbox
          onChange={pilih}
          color="primary"
          checked={checked.find((id) => order.id === id) ? true : false}
        />
      </Td>
      <Td data-th="Product">
        <Box
          sx={{
            display: 'flex',
            alignItems: {
              xs: 'center',
              md: 'start',
            },
            p: '8px 5px',
          }}
        >
          <Box
            sx={{
              boxSizing: 'border-box',
              position: 'relative',
              p: '40px',
              mr: '15px',
            }}
          >
            <img
              src={order.productDetails.img_url[0]}
              alt="product"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '80px',
                height: '80px',
              }}
            />
          </Box>
          <Typography
            sx={{
              textAlign: 'left',
              color: '#333333',
              fontWeight: '500',
              wordBreak: {
                xs: 'break-all',
                md: 'normal',
              },
            }}
          >
            {order.productDetails.name}
          </Typography>
        </Box>
      </Td>
      <Td data-th="Harga">
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '400',
            padding: '8px 5px',
          }}
        >
          {order.productDetails.price}
        </Typography>
      </Td>
      <Td data-th="Kuantitas">
        <InputNumber
          sx={{
            p: '8px 5px',
            justifyContent: {
              md: 'center',
            },
          }}
          useValue={[qty, setQty]}
          min={1}
          max={order.productDetails.stock}
        />
      </Td>
      <Td data-th="Lama sewa">
        <InputNumber
          sx={{
            p: '8px 5px',
            justifyContent: {
              md: 'center',
            },
          }}
          useValue={[lamaSewa, setLamaSewa]}
          min={1}
          max={2500}
        />
      </Td>
      <Td data-th="Total">
        <Typography
          sx={{
            fontSize: '20px',
            color: 'primary.main',
            fontWeight: '600',
            padding: '8px 5px',
          }}
        >
          {order.subTotalPrice}
        </Typography>
      </Td>
    </Tr>
  )
}

const Table = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  borderTop: '1px solid #ececec',
  borderBottom: '1px solid #ececec',
}))

const Thead = styled('thead')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

const Th = styled('th')({
  boxSizing: 'border-box',
  padding: '20px 0',
  width: '40px',
  color: '#383838',
  fontSize: '14px',
  fontWeight: '500',
  textAlign: 'center',
  letterSpacing: '-0.5px',
  borderTop: '1px solid #959da6',
  borderBottom: '1px solid #d3d3d3',
})

const Tr = styled('tr')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'block',
    marginBottom: '25px',
    borderTop: '1px solid #efefef',
    overflow: 'hidden',
  },
  '&:last-of-type': {
    borderBottom: '1px solid #ccd2d9',
  },
}))

const Td = styled('td')(({ theme }) => ({
  position: 'relative',
  boxSizing: 'border-box',
  fontSize: '14px',
  padding: '25px 15px',
  borderTop: '1px solid #ccd2d9',
  borderLeft: '1px solid #f6f6f6',
  textAlign: 'center',
  '&:first-of-type, &:nth-of-type(2)': {
    borderLeft: 0,
  },
  [theme.breakpoints.down('md')]: {
    display: 'table',
    width: '100%',
    fontWeight: '400',
    borderTop: 0,
    borderRight: '1px solid #efefef',
    borderBottom: '1px solid #efefef',
    textAlign: 'left',
    overflow: 'hidden',
    '&:first-of-type': {
      textAlign: 'center',
    },
    '&::before': {
      content: 'attr(data-th)',
      display: 'table-cell',
      padding: '5px 8px',
      width: '25%',
      height: '20px',
      backgroundColor: '#f4f4f4',
      fontSize: '12px',
      textAlign: 'left',
      verticalAlign: 'middle',
    },
  },
}))
