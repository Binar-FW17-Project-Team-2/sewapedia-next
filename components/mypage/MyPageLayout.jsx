import { Box, Container, Typography } from '@mui/material'
import Layout from '../Layout'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { useRouter } from 'next/router'

export default function LayoutMyPage({ title, children }) {
  return (
    <Layout title={title}>
      <Container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'start',
          py: '50px',
        }}
      >
        <Box
          sx={{
            width: '180px',
            flexShrink: 0,
            minHeight: '500px',
            borderRight: '1px solid #f6f6f6',
          }}
        >
          <Menu text="My Profile" href="/mypage">
            <PersonOutlinedIcon color="info" />
          </Menu>
          <Menu text="My Order" active="/myorder" href="/myorder/belumbayar">
            <AssignmentOutlinedIcon color="info" />
          </Menu>
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: '15px',
            minHeight: '500px',
            ml: '-1px',
            borderLeft: '1px solid #f6f6f6',
            borderRight: '1px solid #f6f6f6',
          }}
        >
          {children}
        </Box>
      </Container>
    </Layout>
  )
}

function Menu({ text, children, href, active }) {
  const router = useRouter()

  function handleClick(e) {
    e.preventDefault()
    router.push(href)
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        mt: 1,
        cursor: 'pointer',
        p: 1,
        '&:hover': {
          backgroundColor: '#f9f9f9',
        },
      }}
    >
      {children}
      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: '600',
          ml: 1,
          color: router.asPath.startsWith(active ?? href)
            ? 'primary.main'
            : 'black',
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}
