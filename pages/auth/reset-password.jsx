import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Form, Formik } from 'formik'
import { TextInput } from '../../components/CustomInput'
import { validationResetPw } from '../../utils/validation'
import { Alert } from '@mui/material'
import { useRouter } from 'next/router'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Sewapedia.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function ResetPassword() {
  const router = useRouter()
  const { token } = router.query
  const [errorPw, setErrorPw] = useState(false)
  const [status, setStatus] = useState(false)

  function unsetError() {
    setErrorPw(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {status ? (
          <Alert
            severity={status.serverity}
            sx={{ width: '100%', mt: 2 }}
            onClose={() => {
              setStatus(false)
            }}
          >
            {status.message}
          </Alert>
        ) : null}
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationResetPw}
          onSubmit={async (values) => {
            if (values.password !== values.confirmPassword) {
              return setErrorPw({
                error: true,
                helperText: 'password tidak sama',
              })
            }
            const res = await fetch('http://localhost:4000/api/v1/resetpw', {
              method: 'POST',
              body: JSON.stringify({
                password: values.confirmPassword,
                token,
              }),
              headers: { 'Content-Type': 'application/json' },
            })
            if (res.status === 400) {
              setStatus({ serverity: 'error', message: 'gagal, link rusak' })
            }
            if (res.status === 200) {
              setStatus({ serverity: 'success', message: 'berhasil reset pw' })
            }
          }}
        >
          <Box component={Form} sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextInput
                  fullWidth
                  id="password"
                  label="New password"
                  name="password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  {...(errorPw ? errorPw : null)}
                  onClick={unsetError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Formik>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}
