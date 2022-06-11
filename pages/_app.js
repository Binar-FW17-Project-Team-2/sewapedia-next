import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'
import { Provider } from 'react-redux'
import store from '../redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
