'use client';

import Login from '../components/login';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Login />
      {children}
    </>
  );
}