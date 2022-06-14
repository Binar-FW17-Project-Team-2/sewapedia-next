import { Box } from '@mui/material'
import ListProduct from '../components/ListProduct'
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import { getWishlist } from '../redux/slices/wishlistSlice'
import { useSession } from 'next-auth/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-creative'
import { useEffect } from 'react'
import Carousel from '../components/Carousel'

export async function getServerSideProps() {
  const { rows: list1 } = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product?limit=6`)
  ).json()
  const { rows: list2 } = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product?limit=6&orderBy=createdAt`
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
  const dispacth = useDispatch()
  const { data, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return
    dispacth(
      getWishlist({
        token: data.user.accessToken,
        userId: data.user.id,
      })
    )
  }, [status])

  return (
    <Layout>
      <Box pt={1}>
        <Box
          sx={{
            width: '100%',
            height: '610px',
            maxHeight: '100vw',
            backgroundColor: '#30694D',
            overflow: 'hidden',
          }}
        >
        <Carousel/>
        </Box>
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
