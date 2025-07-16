'use client';

import { AuthProvider } from "../../components/authContext";
import Login from "../../components/login";
import MainLayout from '../../components/mainLayout';
import { useEffect, useState } from 'react';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { useAuth } from '@/components/authContext'; // your existing auth hook
import { db } from '@/firebase/clientApp';
import PostRow from '@/components/postRow';

interface Deal {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categories: string[];
  validUntil: string;
}

export default function BookmarksLayout() {
  const { user } = useAuth();
  const [bookmarkedDeals, setBookmarkedDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) return;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      const bookmarkedIds: string[] = userSnap.data()?.bookmarks || [];

      if (bookmarkedIds.length === 0) {
        setBookmarkedDeals([]);
        setLoading(false);
        return;
      }

      // Fetch only the bookmarked deals
      const dealsSnapshot = await getDocs(collection(db, 'Deals'));
      const allDeals = dealsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Deal[];

      const filtered = allDeals.filter((deal) => bookmarkedIds.includes(deal.id));
      setBookmarkedDeals(filtered);
      setLoading(false);
    };

    fetchBookmarks();
  }, [user]);

  if (!user) return <p className="p-4 text-white">Please log in to view bookmarks.</p>;
  if (loading) return <p className="p-4 text-white">Loading bookmarks...</p>;

  return (
    <MainLayout>
      <div className="p-8">
      <h1 className="text-2xl font-bold text-white pb-4">Bookmarked Deals</h1>
      {bookmarkedDeals.length > 0 ? (
        <PostRow posts={bookmarkedDeals} />
      ) : (
        <p className="text-white">No bookmarks yet.</p>
      )}
    </div>
    </MainLayout>
  );
}