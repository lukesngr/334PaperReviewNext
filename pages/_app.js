import {SessionProvider} from 'next-auth/react'


function MyApp({Component, pageProps: {session, ... pageProps}}) {
    return (
            <SessionProvider>
                <Component {... pageProps}></Component>
            </SessionProvider>
    )
}

export default MyApp