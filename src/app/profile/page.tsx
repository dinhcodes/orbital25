'use client';

import { useAuth } from '../../components/authContext';
import ProfileLayout from './layout';

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return <ProfileLayout></ProfileLayout>;
  }
}