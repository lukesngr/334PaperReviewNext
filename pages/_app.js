import {SessionProvider} from 'next-auth/react'
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <SessionProvider>
                <Component {... pageProps}></Component>
            </SessionProvider>
            <ReactQueryDevtools />
        </ThemeProvider>
      </QueryClientProvider>
    )
}

export default MyApp