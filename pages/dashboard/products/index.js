import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from '@mui/material'
import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import {
  TableDeleteUser,
  TableEditUser,
} from '../../../components/dashboard/TableButton'

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

export default function Dashboard() {
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
          {/* insert products here */}
          <Button variant="contained" sx={{ mb: 2 }}>
            <Link href="/dashboard/products/add">Add Product</Link>
          </Button>
          <ProductList />
        </Container>
      </Box>
    </Box>
  )
}

function ProductList() {
  const router = useRouter()
  const [product, setProduct] = useState([])
  const { data: session } = useSession()

  const handleEdit = (id) => {
    router.push('/dashboard/products/' + id)
  }

  const handleDelete = (id) => {
    alert('iya ini mau di ddelete ' + id)
  }

  useEffect(() => {
    if (session) getData()
  }, [session])

  async function getData() {
    const { rows } = await (
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product`, {
        headers: { authorization: session.user.accessToken },
      })
    ).json()

    setProduct(rows)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Stock</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((product) => {
            return (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{product.id}</TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.category}</TableCell>
                <TableCell align="center">{product.stock}</TableCell>
                <TableCell align="center">{product.price}</TableCell>
                <TableCell align="center">
                  <TableEditUser id={product.id} handleEdit={handleEdit} />
                  <TableDeleteUser
                    id={product.id}
                    handleDelete={handleDelete}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
