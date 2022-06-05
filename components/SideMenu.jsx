import { useState } from 'react'
import {
  Box,
  Button,
  ClickAwayListener,
  styled,
  Typography,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { useDispatch } from 'react-redux'
import { deleteLastSeen, setLastSeen } from '../redux/slices/lastSeenSlice'
import LastSeen from './sidemenu/LastSeen'

export default function SideMenu() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState('')

  function handleOpen(menu) {
    if (menu === 'lastseen') {
      const lastSeen = JSON.parse(localStorage.getItem('lastSeen'))
      if (lastSeen?.expiry < Date.now()) {
        dispatch(deleteLastSeen())
      } else {
        dispatch(setLastSeen(lastSeen))
      }
    }
    setOpen(true)
    setMenu(menu)
  }
  function handleClose() {
    setOpen(false)
  }

  function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          position: 'fixed',
          display: {
            xs: 'none',
            md: 'flex',
          },
          right: open ? 0 : -235,
          height: '100vh',
          width: '300px',
          transition: '.6s',
          backgroundColor: 'transparent',
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      >
        <Box
          sx={{
            width: '65px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
          onClick={handleClose}
        >
          <QuickMenu
            onClick={(event) => {
              event.stopPropagation()
              handleOpen('profil')
            }}
          >
            <PersonOutlineOutlinedIcon sx={{ color: 'white' }} />
          </QuickMenu>
          <QuickMenu
            onClick={(event) => {
              event.stopPropagation()
              handleOpen('lastseen')
            }}
          >
            <AccessTimeIcon sx={{ color: 'white' }} />
          </QuickMenu>
          <QuickMenu
            onClick={(event) => {
              event.stopPropagation()
              handleOpen('cart')
            }}
          >
            <ShoppingCartOutlinedIcon sx={{ color: 'white' }} />
          </QuickMenu>
          <QuickMenu
            onClick={(event) => {
              event.stopPropagation()
              handleOpen('wishlist')
            }}
          >
            <FavoriteBorderOutlinedIcon sx={{ color: 'white' }} />
          </QuickMenu>
          <QuickMenu onClick={goToTop}>
            <ArrowDropUpIcon sx={{ color: 'white' }} />
          </QuickMenu>
        </Box>
        <Box
          sx={{
            width: '235px',
            height: '100%',
            borderLeft: '1px solid #e5e7ea',
            backgroundColor: 'white',
            overflowY: 'auto',
          }}
        >
          {menu === 'profil' ? (
            <Typography>dari profil</Typography>
          ) : menu === 'lastseen' ? (
            <LastSeen />
          ) : menu === 'cart' ? (
            <Typography>dari cart</Typography>
          ) : menu === 'wishlist' ? (
            <Typography>dari wishlist</Typography>
          ) : null}
        </Box>
      </Box>
    </ClickAwayListener>
  )
}

const QuickMenu = styled(Button)(({ theme }) => ({
  width: '50px',
  minWidth: '50px',
  height: '50px',
  padding: 0,
  marginTop: '10px',
  backgroundColor: `${theme.palette.primary.light}`,
  borderRadius: '50vh',
  '&:hover': {
    backgroundColor: `${theme.palette.primary.light}`,
    border: '1px solid black',
  },
}))
