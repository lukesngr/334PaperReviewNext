import {SessionProvider} from 'next-auth/react'
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#0f4ea5',
    },
  },
});

function MyApp({Component, pageProps: {session, ... pageProps}}) {
    return (
        <ThemeProvider theme={theme}>
            <SessionProvider>
                <Component {... pageProps}></Component>
            </SessionProvider>
        </ThemeProvider>
    )
}

export default MyApp