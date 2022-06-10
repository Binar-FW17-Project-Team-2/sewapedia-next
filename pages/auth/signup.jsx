import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import { Link as LinkMaterial } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Form, Formik } from 'formik'
import { validationSignup } from '../../utils/validation'
import { TextInput } from '../../components/CustomInput'
import { useRouter } from 'next/router'
import Image from 'next/image'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <LinkMaterial color="inherit" href="https://mui.com/">
        Your Website
      </LinkMaterial>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function SignInSide() {
  const [errorEmail, setErrorEmail] = useState(false)
  const router = useRouter()

  function unsetError() {
    setErrorEmail(false)
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            position: 'relative',
          }}
        >
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2Fsignin.jpg?alt=media&token=b657a994-ee67-4c84-8e35-4630e6618515"
            layout="fill"
            priority="true"
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
              }}
              validationSchema={validationSignup}
              onSubmit={(values) => {
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/signup`, {
                  method: 'POST',
                  body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    name: values.name,
                  }),
                  headers: { 'Content-Type': 'application/json' },
                })
                  .then(async (res) => {
                    const data = await res.json()
                    if (res.ok) {
                      router.push('/auth/signin')
                    } else if (res.status === 400) {
                      setErrorEmail({ error: true, helperText: data.message })
                    } else {
                      console.log(data)
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }}
            >
              <Box component={Form} sx={{ mt: 1 }}>
                <TextInput
                  margin="normal"
                  fullWidth
                  name="name"
                  label="Name"
                  id="name"
                  autoFocus
                />
                <TextInput
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  {...(errorEmail ? errorEmail : null)}
                  onClick={unsetError}
                />
                <TextInput
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
                <Grid container>
                  <Grid item xs>
                    <LinkMaterial
                      color="primary"
                      onClick={() => router.push('/auth/forgot-password')}
                      variant="body2"
                    >
                      Forgot password?
                    </LinkMaterial>
                  </Grid>
                  <Grid item>
                    <LinkMaterial
                      color="primary"
                      onClick={() => router.push('/auth/signin')}
                      variant="body2"
                    >
                      {'Already have an account? Sign In!'}
                    </LinkMaterial>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
