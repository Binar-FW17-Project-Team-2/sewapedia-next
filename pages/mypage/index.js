import { Box, Typography } from '@mui/material'
import { getToken } from 'next-auth/jwt'
import { useSession } from 'next-auth/react'
import LayoutMyPage from '../../components/mypage/MyPageLayout'

export async function getServerSideProps({ req }) {
  const token = await getToken({ req })
  if (!token)
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  return { props: {} }
}

export default function MyPage() {
  const { data } = useSession()
  return (
    <LayoutMyPage title="Sewapedia | MyProfile">
      <Box
        sx={{
          widht: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            minWidth: '130px',
            width: '25%',
            p: 1,
          }}
        >
          <Box
            sx={{
              width: '100%',
              paddingTop: '100%',
              backgroundColor: '#f6f6f6',
              borderRadius: '50%',
              overflow: 'hidden',
              background: `url(${data?.user.image})`,
              backgroundSize: 'cover',
            }}
          />
        </Box>
        <Typography fontWeight="bold" variant="h5">
          {data?.user.name}
        </Typography>
        <Typography>{data?.user.email}</Typography>
      </Box>
    </LayoutMyPage>
  )
}
