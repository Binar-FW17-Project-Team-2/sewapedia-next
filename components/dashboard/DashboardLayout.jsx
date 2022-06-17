import React, { useState } from 'react'
import NavBarAdmin from './NavbarAdmin'
import SideDrawer from './SideDrawer'
import CssBaseline from '@mui/material/CssBaseline'
import Head from 'next/head'
import { Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { closeToast, selectToast } from '../../redux/slices/toastSlice'

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const toast = useSelector(selectToast)

  const closeSnackbar = () => {
    dispatch(closeToast())
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <CssBaseline />
      <NavBarAdmin open={open} setOpen={setOpen} />
      <SideDrawer open={open} setOpen={setOpen} />
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
