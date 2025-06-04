'use client';

import { useAuth } from '../../components/authContext';
import BookmarksLayout from './layout';

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return <BookmarksLayout></BookmarksLayout>;
  }
}