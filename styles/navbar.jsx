import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import { styled } from '@mui/material'

export const NavBar = styled(AppBar)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    position: 'sticky',
  },
  position: 'relative',
  top: 0,
  backgroundColor: 'transparent',
  boxShadow: '0px 3px 10px rgb(0 0 0 /3%)',
}))

export const WrapNav = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    padding: 0,
  },
}))

// ------> NavTOP <--------

export const WrapNavTop = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 24px',
  backgroundColor: 'white',
  [theme.breakpoints.down('md')]: {
    backgroundColor: '#F2F2F2',
  },
}))

export const SearchWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '250px',
  height: '20px',
  borderRadius: '10px',
  backgroundColor: '#F2F2F2',
  marginLeft: 0,
  [theme.breakpoints.down('md')]: {
    backgroundColor: 'white',
    marginLeft: 'auto',
  },
}))

export const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  height: '100%',
  padding: '0 15px',
}))

export const SearchBtn = styled(IconButton)(({ theme }) => ({
  padding: '0px 10px 0 0',
}))

export const MenuWrap = styled(Stack)(({ theme }) => ({
  position: 'realtive',
  display: 'felx',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

export const Name = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  color: 'black',
  textDecoration: 'none',
  padding: '10px 10px',
  cursor: 'pointer',
  '&:nth-of-type(n+2):before': {
    content: '""',
    position: 'absolute',
    top: '35%',
    left: 0,
    width: '1px',
    height: '30%',
    background: '#333',
  },
}))

export const MenuTop = styled(Name)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))

// ----> NavMid <----

export const WrapNavMid = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: '5px 24px',
  [theme.breakpoints.down('md')]: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export const IconMenuMid = styled(MenuIcon)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}))

export const BrandWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'end',
  cursor: 'pointer',
  margin: 'auto',
}))

export const BrandIcon = styled(SmartToyOutlinedIcon)(({ theme }) => ({
  fontSize: '56px',
  color: theme.palette.primary.main,
  [theme.breakpoints.down('md')]: {
    fontSize: '46px',
    color: 'black',
  },
}))

export const Sewa = styled(Typography)(({ theme }) => ({
  fontSize: '34px',
  fontWeight: 'bold',
  fontFamily: 'roboto',
  color: theme.palette.primary.main,
  [theme.breakpoints.down('md')]: {
    fontSize: '24px',
    color: 'black',
  },
}))

export const Pedia = styled(Typography)(({ theme }) => ({
  fontSize: '34px',
  fontWeight: 'bold',
  color: 'black',
  [theme.breakpoints.down('md')]: {
    fontSize: '24px',
    color: 'white',
  },
}))

export const MenuMobile = styled(Drawer)(({ theme }) => ({
  border: 'none',
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}))

// ---> Nav Bot <----

export const WrapNavBot = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0px 9px 2px',
  color: 'black',
  backgroundColor: 'white',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

export const MenuBot = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  fontSize: '1em',
  fontWeight: '600',
  textTransform: 'uppercase',
  textDecoration: 'none',
  color: 'black',
  padding: '10px 15px',
  cursor: 'pointer',
  '&:nth-of-type(n+2):before': {
    content: '""',
    position: 'absolute',
    top: '35%',
    left: 0,
    width: '1px',
    height: '30%',
    background: '#333',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 0,
    height: '3px',
    transform: 'translate(-50%, 0)',
    opacity: 0,
    backgroundColor: `${theme.palette.primary.main}`,
    transition: theme.transitions.create(['all'], {
      duration: '0.8s',
      easing: 'ease',
    }),
  },
  '&:hover:after': {
    content: '""',
    width: 'calc(100% - 20px)',
    opacity: 1,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8em',
  },
}))

export const CategoryWrap = styled(Box)(({ theme }) => ({
  boxShadow: 'none',
  display: 'block',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

export const ProfilWrap = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  padding: '15px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
}))

export const Avatar = styled(Box)(({ theme }) => ({
  positon: 'relative',
  width: '40px',
  height: '40px',
  flexShrink: 0,
  mr: '10px',
  overflow: 'hidden',
  borderRadius: '50%',
  backgroundColor: 'tomato',
}))

export const ProfileNameMobile = styled(Typography)(({ theme }) => ({
  color: 'rgba(255,255,255,0.8)',
  ...theme.typography.p,
  marginLeft: '5px',
}))

export const MobileAuth = styled(Button)(({ theme }) => ({
  padding: '6px 16px',
  borderRadius: '50vh',
  backgroundColor: 'rgba(255,255,255,0.8)',
  marginLeft: 'auto',
}))
