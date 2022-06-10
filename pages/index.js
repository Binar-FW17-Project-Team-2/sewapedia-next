import { Box } from '@mui/material'
import ListProduct from '../components/ListProduct'
import Layout from '../components/Layout'

export async function getStaticProps() {
  const { rows: list1 } = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product?limit=6`)
  ).json()
  const { rows: list2 } = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product?limit=6&orderBy=createdAt`,
      {
        credentials: 'include',
      }
    )
  ).json()

  return {
    props: {
      list1,
      list2,
    },
  }
}

export default function Home({ list1, list2 }) {
  return (
    <Layout>
      <Box pt={1}>
        <Box
          sx={{
            width: '100%',
            height: '510px',
            maxHeight: '100vw',
            backgroundColor: '#30694D',
          }}
        ></Box>
        <Box>
          <ListProduct title="Bagaimana Dengan Ini" products={list1} />
        </Box>
        <Box
          sx={{
            backgroundColor: '#F1F3F5',
          }}
        >
          <ListProduct title="Product Terbaru" products={list2} />
        </Box>
        <Box>
          <ListProduct title="Semoga harimu menyenangkan" products={list1} />
        </Box>
      </Box>
    </Layout>
  )
}
