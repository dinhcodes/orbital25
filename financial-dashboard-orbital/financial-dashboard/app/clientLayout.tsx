'use client';

import Login from './login';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Login />
      {children}
    </>
  );
}