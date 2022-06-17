import { Box } from '@mui/material'
import ListProduct from '../components/ListProduct'
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import { getWishlist } from '../redux/slices/wishlistSlice'
import { useSession } from 'next-auth/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCreative, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-creative'
import { useEffect } from 'react'

export async function getServerSideProps() {
  const { rows: list1 } = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product?limit=6&order=ASC`
    )
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
    if (data) {
      dispacth(
        getWishlist({
          token: data.user.accessToken,
          userId: data.user.id,
        })
      )
    }
  }, [status])

  return (
    <Layout>
      <Box pt={1}>
        <Box
          sx={{
            width: '100%',
            height: '510px',
            maxHeight: '100vw',
            backgroundColor: '#30694D',
            overflow: 'hidden',
          }}
        >
          <Swiper
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              clickable: true,
            }}
            effect={'creative'}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ['-20%', 0, -1],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }}
            modules={[Autoplay, Pagination, EffectCreative]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '510px',
                  backgroundColor: '#B7D0B1',
                }}
              >
                slide1
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '510px',
                  backgroundColor: '#316D4D',
                }}
              >
                slide3
              </Box>
            </SwiperSlide>
          </Swiper>
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
