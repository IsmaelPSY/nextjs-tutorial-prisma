import './global.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo App',
  description: 'App made following Fazt tutorial',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " h-screen w-screen"}>
        {children}
        <Toaster/>
      </body>
    </html>
  )
}
