import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { defaultTheme } from '../styles/defaultTheme'
import { SessionProvider } from "next-auth/react"
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={defaultTheme}>
      <SessionProvider session={pageProps.session}>
            <Header />
            <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  )
}