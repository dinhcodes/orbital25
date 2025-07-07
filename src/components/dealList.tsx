'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/clientApp'; // your Firestore export
import PostRow from './postRow'

interface Deal {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    categories: string[];
    validUntil: string;
}

interface DealsPageProps {
  selectedCategory: string | null;
}

export default function DealsPage({ selectedCategory }: DealsPageProps) {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const querySnapshot = await getDocs(collection(db, 'Deals'));
      const fetchedDeals = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Deal[];

      setDeals(fetchedDeals);
    };

    fetchDeals();
  }, []);

  const filteredDeals = selectedCategory
    ? deals.filter(deal => deal.categories.includes(selectedCategory))
    : deals;

  return (
    <div className="pt-8">
      <PostRow posts={filteredDeals} />
    </div>
  );
}