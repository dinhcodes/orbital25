'use client';

import { useAuth } from '../../components/authContext';
import ClientLayout from '../../app/clientLayout';
import { AuthProvider } from '../../components/authContext';
import ProfileLayout from './layout';

export default function Home() {
  const { user, logOut } = useAuth();

  if (!user) {
    return <ProfileLayout></ProfileLayout>;
  }
}