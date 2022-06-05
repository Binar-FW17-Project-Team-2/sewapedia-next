import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { closeToast, selectToast } from '../redux/slices/toastSlice'
import { Snackbar } from '@mui/material'
import Footer from './Footer'
import Navbar from './Navbar'
import SideMenu from './SideMenu'

export default function Layout({ children, title }) {
  const dispatch = useDispatch()
  const toast = useSelector(selectToast)

  const closeSnackbar = (event, reason) => {
    // if (reason === 'clickaway') { return; }
    dispatch(closeToast())
  }

  return (
    <>
      <Head>
        <title>{title ?? 'Sewapedia'}</title>
      </Head>
      <SideMenu />
      <Navbar />
      {children}
      <Footer />
      <Snackbar
        open={toast.isOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={toast.msg}
        sx={{
          '& div': {
            bgcolor: toast.bgColor,
          },
        }}
      />
    </>
  )
}
