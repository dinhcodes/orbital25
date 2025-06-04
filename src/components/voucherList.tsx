'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/clientApp'; // your Firestore export
import PostRow from './postRow'

interface Voucher {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    categories: string[];
}

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      const querySnapshot = await getDocs(collection(db, 'Deals'));
      const fetchedVouchers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Voucher[];

      setVouchers(fetchedVouchers);
    };

    fetchVouchers();
  }, []);

  return (
    <div className="pt-8">
      <PostRow posts={vouchers} />
    </div>
  );
}