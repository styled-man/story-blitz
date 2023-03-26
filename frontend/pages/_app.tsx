import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QuizProvider } from '../hooks/QuizContext'

function MyApp({ Component, pageProps }: AppProps) {
  return <QuizProvider>
    <Component {...pageProps} />
  </QuizProvider> 
}

export default MyApp
