import {
  Box,
  Stack,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
  Fade,
} from '@mui/material'
import {
  Avatar,
  BrandIcon,
  BrandWrap,
  CategoryWrap,
  IconMenuMid,
  MenuBot,
  MenuMobile,
  MenuTop,
  MenuWrap,
  MobileAuth,
  Name,
  NavBar,
  Pedia,
  ProfileNameMobile,
  ProfilWrap,
  SearchBtn,
  SearchInput,
  SearchWrap,
  Sewa,
  WrapNav,
  WrapNavBot,
  WrapNavMid,
  WrapNavTop,
} from '../styles/navbar'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dataCategory from '../utils/data/category'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  return (
    <NavBar>
      <WrapNav maxWidth="xl">
        <NavTop />
        <NavMid />
        <NavBot />
      </WrapNav>
    </NavBar>
  )
}

function NavTop() {
  const { data } = useSession()
  const router = useRouter()

  async function logout() {
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    router.push(data.url)
  }

  return (
    <WrapNavTop>
      <SearchWrap>
        <SearchInput placeholder="serach product" />
        <SearchBtn type="submit">
          <SearchIcon />
        </SearchBtn>
      </SearchWrap>
      <MenuWrap>
        {data?.user
          ? [
              <Name key="name"> Hi, {data?.user.name} </Name>,
              <MenuTop component="a" onClick={logout} key="logout">
                {' '}
                Logout{' '}
              </MenuTop>,
            ]
          : [
              <TopMenu href="/auth/signin" key="signin">
                Login
              </TopMenu>,
              <TopMenu href="/auth/signup" key="signup">
                Register
              </TopMenu>,
            ]}
        <TopMenu href="/service">Service</TopMenu>
      </MenuWrap>
    </WrapNavTop>
  )
}

function NavMid() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <WrapNavMid>
      <IconMenuMid onClick={() => setOpen(true)} />
      <BrandWrap onClick={() => router.push('/')}>
        <BrandIcon />
        <Sewa component="h1"> SEWA </Sewa>
        <Pedia component="h1"> PEDIA </Pedia>
      </BrandWrap>
      {/* menu mobile ketuka menu icon ditekan */}
      <MenuMobile anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 'calc(100vw - 60px)' }}>
          <MobileMenu />
        </Box>
      </MenuMobile>
    </WrapNavMid>
  )
}

const stylePaper = createTheme(theme, {
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #DDDDDD',
        },
      },
    },
  },
})

function NavBot() {
  const [open, setOpen] = useState({ value: false, anchorEl: null })
  const { data } = useSession()

  function handleOpen(e) {
    setOpen({
      value: true,
      anchorEl: e.currentTarget,
    })
  }
  function handleClose() {
    setOpen({ value: false, anchorEl: null })
  }

  return (
    <ThemeProvider theme={stylePaper}>
      <WrapNavBot>
        <Stack position="relative" direction="row">
          <MenuBot onClick={handleOpen}> Category </MenuBot>
          <BotMenu href="/products">Products</BotMenu>
          <BotMenu href="/event">Event</BotMenu>
          {data?.user.role === 'admin' ? (
            <BotMenu href="/dashboard">Dashboard</BotMenu>
          ) : null}
        </Stack>
        <Stack position="relative" direction="row" ml="auto">
          <BotMenu href="/cart">
            <ShoppingCartOutlinedIcon sx={{ paddingRight: '5px' }} /> cart
          </BotMenu>
          <BotMenu href="/wishlist">
            <FavoriteBorderOutlinedIcon sx={{ paddingRight: '5px' }} /> wishlist
          </BotMenu>
          <BotMenu href="/mypage">
            <PersonOutlineOutlinedIcon sx={{ paddingRight: '5px' }} /> MyPage
          </BotMenu>
        </Stack>

        {/* menu jika category di klik */}
        {/* menu pc */}
        <CategoryWrap
          component={Menu}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          id="nav-menu"
          anchorEl={open.anchorEl}
          open={open.value}
          onClose={handleClose}
        >
          {dataCategory.map((category, idx) => (
            <MenuItem onClick={handleClose} key={idx}>
              {category.name}
            </MenuItem>
          ))}
        </CategoryWrap>
      </WrapNavBot>
    </ThemeProvider>
  )
}

function MobileMenu() {
  const { data } = useSession()

  return (
    <>
      <ProfilWrap>
        {data?.user ? (
          <Avatar>
            <Image
              src={data.user.image}
              alt={data.user.name}
              width="40px"
              height="40px"
            />
          </Avatar>
        ) : null}
        <Box>
          <ProfileNameMobile component="p">
            {data?.user.name ?? 'silahkan login :)'}
          </ProfileNameMobile>
        </Box>
        {data?.user ? (
          <MobileAuth onClick={signOut}>Logout</MobileAuth>
        ) : (
          <MobileAuth onClick={signIn}>Login</MobileAuth>
        )}
      </ProfilWrap>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="PROFIL" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FavoriteBorderOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="WISHLIST" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="CART" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Category" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="last seen today" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </>
  )
}

function TopMenu({ children, href }) {
  const router = useRouter()

  function handleClick(e) {
    e.preventDefault()
    router.push(href)
  }

  return (
    <MenuTop
      {...(router.asPath === href ? { sx: { color: 'primary.main' } } : {})}
      component="a"
      href={href}
      onClick={handleClick}
    >
      {children}
    </MenuTop>
  )
}

function BotMenu({ children, href, ...props }) {
  const router = useRouter()

  function handleClick(e) {
    e.preventDefault()
    router.push(href)
  }

  return (
    <MenuBot
      {...(router.asPath === href
        ? {
            sx: {
              '&:after': {
                width: 'calc(100% - 20px)',
                opacity: 1,
              },
            },
          }
        : {})}
      component="a"
      href={href}
      onClick={handleClick}
      {...props}
    >
      {children}
    </MenuBot>
  )
}
