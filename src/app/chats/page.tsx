'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  DocumentData,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebase/clientApp';
import { useAuth } from '@/components/authContext';
import MainLayout from '../../components/mainLayout';

interface ChatPreview {
  id: string;
  dealId: string;
  participants: string[];
  lastMessage?: {
    text: string;
    timestamp: Timestamp;
  };
}

export default function ChatListPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [chats, setChats] = useState<ChatPreview[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as DocumentData),
      })) as ChatPreview[];
      setChats(chatList);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  if (!user) return <p>Please log in to see your chats.</p>;

  return (
    <MainLayout>
        <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Your Chats</h1>
        {chats.length === 0 ? (
            <p>No chats yet. Start a conversation by clicking "Chat" on a deal!</p>
        ) : (
            <ul className="space-y-4">
            {chats.map((chat) => {
                // Find the other participant to display
                const otherUserId = chat.participants.find((id) => id !== user.uid) || 'Unknown';

                return (
                <li
                    key={chat.id}
                    className="p-4 border rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => router.push(`/chats/${chat.id}`)}
                >
                    <p className="font-semibold">Deal ID: {chat.dealId}</p>
                    <p className="text-sm text-gray-700">
                    Chat with: <span className="italic">{otherUserId}</span>
                    </p>
                    <p className="mt-1 text-gray-600">
                    {chat.lastMessage?.text ?? 'No messages yet'}
                    </p>
                </li>
                );
            })}
            </ul>
        )}
        </div>
    </MainLayout>
  );
}