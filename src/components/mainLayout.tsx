'use client';

import { useAuth } from './authContext';
import Header from './header';
import SideMenu from './sideMenu';
import Login from './login';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user } = useAuth();

  // Show login if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Login />
      </div>
    );
  }

  // Show main app layout if user is authenticated
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <main className="flex-1 p-6 ml-16">
        <Header />
        {children}
      </main>
    </div>
  );
}
