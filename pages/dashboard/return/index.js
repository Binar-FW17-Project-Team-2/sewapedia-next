import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material'
import { Form, Formik } from 'formik'
import { getSession, useSession } from 'next-auth/react'
import { useState } from 'react'
import { TextInput } from '../../../components/CustomInput'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  if (session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }
  return { props: {} }
}

export default function Return() {
  const [rented, setRented] = useState({})

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardLayout />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <SearchRented setRented={setRented} />
          {rented.id ? <Rented rented={rented} setRented={setRented} /> : null}
        </Container>
      </Box>
    </Box>
  )
}

function SearchRented({ setRented }) {
  const { data: session } = useSession()

  return (
    <Formik
      initialValues={{
        rentedId: '',
      }}
      onSubmit={async (values) => {
        if (session) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/rented/${values.rentedId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${session.user.accessToken}`,
              },
            }
          )
          const data = await res.json()
          if (data) setRented(data)
          if (!data) setRented({})
        }
      }}
    >
      <Paper
        component={Form}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          mx: 'auto',
        }}
      >
        <TextInput
          sx={{
            ml: 1,
            flex: 1,
            border: 'none',
          }}
          required
          placeholder="Search Rented"
          name="rentedId"
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchOutlinedIcon />
        </IconButton>
      </Paper>
    </Formik>
  )
}

function Rented({ rented, setRented }) {
  const { data: session } = useSession()

  async function returnConfirmation() {
    try {
      if (session) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/rented/${rented.id}`,
          {
            method: 'POST',
            headers: {
              authorization: `Bearer ${session.user.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await res.json()
        if (res.ok) return setRented(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function deadline(order) {
    const rentAt = new Date(order.updatedAt)
    rentAt.setDate(rentAt.getDate() + order.lamaSewa)
    return rentAt.toDateString()
  }

  function penalty(order) {
    const rentAt = new Date(order.updatedAt)
    rentAt.setDate(rentAt.getDate() + order.lamaSewa)
    const deadlineMs = rentAt.getTime()
    const nowMs = new Date().getTime()
    const lateMs = nowMs - deadlineMs
    if (lateMs > 0) {
      const day = Math.ceil(lateMs / (24 * 60 * 60 * 1000))
      return order.productDetails.price * day
    } else {
      return 0
    }
  }

  return (
    <Container maxWidth="md" sx={{ pt: 10 }}>
      <Box
        sx={{
          boxSizing: 'border-box',
          width: '100%',
          p: 3,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Box
          sx={{
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100px',
              flexShrink: 0,
              paddingTop: '100px',
              background: `url(${rented.productDetails.img_url[0]})`,
              backgroundSize: 'cover',
            }}
          />
          <Box
            sx={{
              flex: 1,
              pl: 2,
            }}
          >
            <Typography component="h1" fontWeight="bold" variant="body1">
              {rented.productDetails.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                pt: 1,
              }}
            >
              <Typography
                sx={{ flex: 1 }}
                component="p"
                variant="body1"
              >{`Kuantitas: ${rented.qty} buah`}</Typography>
              <Typography
                sx={{ flex: 1, textAlign: 'center' }}
                component="p"
                variant="body1"
              >{`Lama sewa: ${rented.lamaSewa} hari`}</Typography>
              <Typography
                sx={{ flex: 1, textAlign: 'right' }}
                component="p"
                variant="body1"
              >{`Harga: Rp${rented.productDetails.price}`}</Typography>
            </Box>
            {rented.status === 'rented' ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  pt: 1,
                }}
              >
                <Typography>
                  {new Date(rented.createdAt).toDateString()}
                </Typography>
                <Typography textAlign="center">Sampai</Typography>
                <Typography>{deadline(rented)}</Typography>
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box
          sx={{
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'end',
            width: '100%',
            p: '10px',
            mt: 1,
            backgroundColor: '#f5f5f5',
          }}
        >
          <Button
            onClick={returnConfirmation}
            variant="contained"
            color="primary"
            disabled={rented.status === 'rented' ? false : true}
          >
            {rented.status === 'rented'
              ? 'konfirmasi pengembalian'
              : 'sudah dikembalikan'}
          </Button>
          <Typography ml="auto" mr={2}>
            Penalty:
          </Typography>
          <Typography color="primary">Rp{penalty(rented)},-</Typography>
        </Box>
      </Box>
    </Container>
  )
}
