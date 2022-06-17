import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import LayoutMyPage from './MyPageLayout'

export default function MyOrder({ children }) {
  return (
    <LayoutMyPage>
      <Box
        sx={{
          width: '100%',
          height: '25px',
          display: 'flex',
          borderBottom: '1px solid #f6f6f6',
        }}
      >
        <Tabs href="/myorder/belumbayar" text="Belum Bayar" />
        <Tabs href="/myorder/disewa" text="Di Sewa" />
        <Tabs href="/myorder/dikembalikan" text="Di kembalikan" />
      </Box>
      {children}
    </LayoutMyPage>
  )
}

function Tabs({ text, href }) {
  const router = useRouter()

  function handleClick(e) {
    e.preventDefault()
    router.push(href)
  }

  return (
    <Typography
      onClick={handleClick}
      sx={{
        flex: 1,
        textAlign: 'center',
        cursor: 'pointer',
        borderBottom: router.asPath.startsWith(href) ? '2px solid' : 'none',
        borderColor: 'primary.main',
        '&:hover': {
          color: 'primary.main',
        },
      }}
    >
      {text}
    </Typography>
  )
}
