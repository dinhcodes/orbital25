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
import ChatBox from '@/components/ChatBox';
import MainLayout from '@/components/mainLayout';

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
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

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
        <div className="max-w-4xl mx-auto p-4 grid grid-cols-3 gap-4">
        <div className="col-span-1 border rounded p-2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Your Chats</h2>
            {chats.length === 0 ? (
            <p>No chats yet.</p>
            ) : (
            <ul className="space-y-2">
                {chats.map((chat) => {
                const otherUserId = chat.participants.find((id) => id !== user.uid) || 'Unknown';
                return (
                    <li
                    key={chat.id}
                    className={`p-2 rounded cursor-pointer ${
                        chat.id === selectedChatId ? 'bg-gray-300' : 'hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedChatId(chat.id)}
                    >
                    <p className="font-semibold">Deal: {chat.dealId}</p>
                    <p className="text-sm">Chat with: {otherUserId}</p>
                    <p className="text-xs text-gray-600 truncate">
                        {chat.lastMessage?.text ?? 'No messages yet'}
                    </p>
                    </li>
                );
                })}
            </ul>
            )}
        </div>

        <div className="col-span-2 border rounded p-2 max-h-[80vh] overflow-auto">
            {selectedChatId ? (
            <ChatBox chatId={selectedChatId} />
            ) : (
            <p className="text-center text-gray-500 mt-20">Select a chat to start messaging</p>
            )}
        </div>
        </div>
    </MainLayout>
  );
}