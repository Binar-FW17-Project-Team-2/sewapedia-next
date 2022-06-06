import { useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link as LinkMaterial } from '@mui/material'
import { Form, Formik } from 'formik'
import { validationLogin } from '../../utils/validation'
import { TextInput } from '../../components/CustomInput'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <a href="https://github.com/Binar-FW17-Project-Team-2/Sewapedia-NextJs">
        Sewapedia
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function LoginPage() {
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPw, setErrorPw] = useState(false)
  const router = useRouter()

  function unsetError() {
    setErrorEmail(false)
    setErrorPw(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
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
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              fontWeight: 'bold',
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{ marginBottom: '40px' }}
            >
              Login to your account
            </Typography>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validationLogin}
              onSubmit={async (values) => {
                try {
                  const res = await signIn('credentials', {
                    email: values.email,
                    password: values.password,
                    callbackUrl: `${window.location.origin}`,
                    redirect: false,
                  })
                  console.log(res)
                  if (res.error) {
                    const err = JSON.parse(res.error)
                    console.log(err)
                    'password' in err
                      ? setErrorPw({ error: true, helperText: err.password })
                      : setErrorEmail({ error: true, helperText: err.email })
                  }
                  if (res.url) router.push(res.url)
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              <Box component={Form} sx={{ mt: 1 }}>
                <TextInput
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
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
                  {...(errorPw ? errorPw : null)}
                  onClick={unsetError}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>

                <Grid container>
                  <Grid item xs>
                    <LinkMaterial
                      onClick={() => router.push('/auth/forgot-password')}
                      variant="body2"
                    >
                      Forgot password?
                    </LinkMaterial>
                  </Grid>
                  <Grid item>
                    <LinkMaterial
                      onClick={() => router.push('/auth/signup')}
                      variant="body2"
                    >
                      {"Don't have an account? Sign Up"}
                    </LinkMaterial>
                  </Grid>
                </Grid>
                <Button
                  onClick={() => signIn('google')}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                  startIcon={
                    <Image
                      src="/images/ic_google.svg"
                      alt="google"
                      width="20px"
                      height="20px"
                    />
                  }
                >
                  Login With Google
                </Button>
                <Button
                  onClick={() => signIn('github')}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                  startIcon={
                    <Image
                      src="/images/ic_github.svg"
                      alt="google"
                      width="20px"
                      height="20px"
                    />
                  }
                >
                  Login With Github
                </Button>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
