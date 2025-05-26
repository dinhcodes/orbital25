import '../src/app/globals.css'
import Header from '../components/header';
import SideMenu from '../components/sideMenu';
import { AuthProvider } from '../components/authContext';
import ClientLayout from './clientLayout';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      
      <html lang="en">
            <body className="flex">
              <SideMenu />
              <main className="flex-1 p-6">
                <AuthProvider><ClientLayout>{children}</ClientLayout></AuthProvider>
                <Header />
                {children}
              </main>
            </body>
      </html>
    )
  }