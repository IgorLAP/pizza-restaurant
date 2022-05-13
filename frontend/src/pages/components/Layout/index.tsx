import { ReactElement } from 'react'

import { Footer } from '../Footer'
import { Navbar } from '../Navbar'

interface LayoutProps {
  children: ReactElement;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
        { children }
      <Footer />
    </>
  )
}