import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Layout from '../../components/Layout'

export async function getServerSideProps({ query }) {
  const category = query.category ? `&category=${query.category}` : ''
  const fallbackData = await (
    await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/v1/product?limit=${6}&offset=0${category}`
    )
  ).json()
  return { props: { fallbackData } }
}

export default function Products({ fallbackData }) {
  const [products, setProducts] = useState(fallbackData)
  const [page, setPage] = useState(1)
  const limit = 6

  useEffect(() => {
    setProducts(fallbackData)
  }, [fallbackData])

  function handlePagination(event, value) {
    setPage(value)
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
          {!products.rows.length ? (
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
            count={Math.ceil(products.count / limit)}
            page={page}
            onChange={handlePagination}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Container>
    </Layout>
  )
}
