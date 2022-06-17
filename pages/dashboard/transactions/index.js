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
import { TextInput } from '../../../components/CustomInput'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import PersonIcon from '@mui/icons-material/Person'
import { useEffect, useState } from 'react'
import { Content, ProdukDipesan } from '../../checkout'
import { useDispatch } from 'react-redux'
import { errorToast, successToast } from '../../../redux/slices/toastSlice'

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

export default function Transactions() {
  const [receipt, setReceipt] = useState({})

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
          <SearchReceipt setReceipt={setReceipt} />
          <Receipt receipt={receipt} />
        </Container>
      </Box>
    </Box>
  )
}

function SearchReceipt({ setReceipt }) {
  const { data: session } = useSession()

  return (
    <Formik
      initialValues={{
        receiptId: '',
      }}
      onSubmit={async (values) => {
        if (session) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/${values.receiptId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${session.user.accessToken}`,
              },
            }
          )
          const data = await res.json()
          if (data) setReceipt(data)
          if (!data) setReceipt({})
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
          placeholder="Search Receipt"
          name="receiptId"
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

function Receipt({ receipt }) {
  const dispatch = useDispatch()
  const [status, setStatus] = useState('')
  const { data: session } = useSession()

  useEffect(() => {
    setStatus(receipt.status)
  }, [receipt])

  async function confirmPembayaran() {
    try {
      if (!session) return
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/${receipt.id}`,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${session.user.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
      if (res.ok) {
        setStatus('payed')
        return dispatch(successToast(data.message))
      }
      dispatch(errorToast(data.message))
    } catch (error) {
      dispatch(errorToast(error.message))
    }
  }

  if (receipt.id)
    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          mt: 2,
        }}
      >
        <Content>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PersonIcon color="primary" />
            <Typography
              color="primary"
              variant="h6"
              sx={{ verticalAlign: 'center' }}
            >
              Penyewa
            </Typography>
          </Box>
          <Typography variant="body1" fontWeight="bold">
            {receipt.renter.name}
          </Typography>
          <Typography variant="body1">{receipt.renter.email}</Typography>
        </Content>
        <Content>
          <Typography variant="h6" fontWeight="bold">
            Produk Dipesan
          </Typography>
          <Box
            sx={{
              borderTop: '1px solid #999',
            }}
          >
            {receipt.listOrderItem.map((item) => (
              <ProdukDipesan item={item} key={item.id} />
            ))}
          </Box>
        </Content>
        <Content display="flex">
          <Typography
            variant="h6"
            color="primary"
            fontWeight="bold"
            display="inline-flex"
          >
            Total: Rp{receipt.totalPrice}
          </Typography>
          <Button
            onClick={confirmPembayaran}
            color="primary"
            variant="contained"
            sx={{
              display: 'inline-flex',
              marginLeft: 'auto',
            }}
            disabled={status === 'unpayed' ? false : true}
          >
            {status === 'unpayed' ? 'Confirm Pembayaran' : 'Sudah Dibayar'}
          </Button>
        </Content>
      </Box>
    )
}
