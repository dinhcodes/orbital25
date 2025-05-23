import '../src/app/globals.css'
import Header from './header';
import SideMenu from './sideMenu';

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
                <Header />
                {children}
              </main>
            </body>
      </html>
    )
  }