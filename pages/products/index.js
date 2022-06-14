import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Layout from '../../components/Layout'

export async function getServerSideProps({ query }) {
  const activePage = query.page ? ~~query.page : 1
  const category = query.category ? `&category=${query.category}` : ''
  const name = query.name ? `&name=${query.name}` : ''
  const limit = `&limit=${query.limit ?? 6}`
  const page = `offset=${query.page ? query.limit * (query.page - 1) : 0}`
  const fallbackData = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product?${page}${limit}${category}${name}`
    )
  ).json()
  return {
    props: {
      fallbackData,
      category,
      limit,
      activePage,
      name,
    },
  }
}

export default function Products({
  fallbackData,
  name,
  category,
  limit,
  activePage,
}) {
  const router = useRouter()
  const [products, setProducts] = useState(fallbackData)

  useEffect(() => {
    setProducts(fallbackData)
  }, [fallbackData])

  function handlePagination(event, value) {
    router.push(`/products?page=${value}${name}${category}${limit}`)
  }

  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: '15px',
            md: '50px',
          },
        }}
      >
        <Box pb={2}>
          <Typography
            component="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: {
                xs: '20px',
                md: '30px',
              },
              textAlign: 'center',
              color: '#333333',
            }}
          >
            List Product
          </Typography>
        </Box>
        <Box
          component="ul"
          mb={2}
          p={0}
          sx={{
            boxSizing: 'border-box',
            width: '100%',
            mr: '-10px',
          }}
        >
          {!products.rows?.length ? (
            <Typography>products tidaak ada</Typography>
          ) : (
            products.rows.map((product) => (
              <Card
                product={product}
                sx={{ width: { xs: '50%', md: '33.33%' } }}
                key={product.id}
              />
            ))
          )}
        </Box>
        <Stack spacing={2} alignItems="center">
          <Pagination
            count={Math.ceil((products.count ?? 0) / limit.split('=')[1])}
            page={activePage}
            onChange={handlePagination}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Container>
    </Layout>
  )
}
