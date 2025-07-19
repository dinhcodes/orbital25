'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/firebase/clientApp';
import { useAuth } from './authContext';

interface ChatPreview {
  id: string;
  dealId: string;
  participants: string[];
  lastMessage?: { text: string; timestamp: any };
}

export default function ChatList() {
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const router = useRouter();
  const params = useSearchParams();
  const openChatId = params.get('open');

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setChats(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatPreview)));
    });

    return () => unsub();
  }, [user?.uid]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Conversations</h1>
      <div className="space-y-2">
        {chats.map(chat => (
          <div
            key={chat.id}
            className={`p-3 rounded border cursor-pointer ${
              chat.id === openChatId ? 'bg-blue-100' : 'bg-white'
            }`}
            onClick={() => router.push(`/chats/${chat.id}`)}
          >
            <p className="font-semibold">Deal ID: {chat.dealId}</p>
            <p className="text-sm text-gray-600">
              {chat.lastMessage?.text ?? 'No messages yet'}
            </p>
          </div>
        ))}
        {chats.length === 0 && <p>No chats yet.</p>}
      </div>
    </div>
  );
}
