import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/redux/provider'
import Header from '@/components/LandingPageHeader/Header'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <Providers>
      <body className='w-full'>
      <Header className='w-full' />
      {children}
      </body>
      </Providers>
    </html>
  )
}
