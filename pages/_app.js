import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
