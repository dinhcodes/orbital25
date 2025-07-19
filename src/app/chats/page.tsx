'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
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

interface Deal {
  title: string;
}

interface User {
  name: string;
}

export default function ChatListPage() {
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [deals, setDeals] = useState<Record<string, Deal>>({});
  const [users, setUsers] = useState<Record<string, User>>({});

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

  // Fetch deal titles when chats change
  useEffect(() => {
    chats.forEach(async (chat) => {
      if (chat.dealId && !deals[chat.dealId]) {
        try {
          const dealDoc = await getDoc(doc(db, 'Deals', chat.dealId));
          if (dealDoc.exists()) {
            setDeals((prev) => ({
              ...prev,
              [chat.dealId]: { title: dealDoc.data().title },
            }));
          }
        } catch (error) {
          console.error('Error fetching deal:', error);
        }
      }
    });
  }, [chats, deals]);

  // Fetch user names when chats change
  useEffect(() => {
  if (!user) return;

  const fetchedUserIds = new Set(Object.keys(users));

  const fetchUsers = async () => {
    const newUsers: Record<string, User> = {};

    await Promise.all(
      chats.map(async (chat) => {
        const otherUserId = chat.participants.find((id) => id !== user.uid);
        if (!otherUserId || fetchedUserIds.has(otherUserId)) return;

        try {
          const userDoc = await getDoc(doc(db, 'users', otherUserId));
          if (userDoc.exists()) {
            const name = userDoc.data().name || 'Unknown';
            newUsers[otherUserId] = { name };
          } else {
            console.warn('User not found:', otherUserId);
          }
        } catch (error) {
          console.error('Error fetching user:', otherUserId, error);
        }
      })
    );

    setUsers((prev) => ({ ...prev, ...newUsers }));
  };

  fetchUsers();
}, [chats, user]);

  if (!user) return <p>Please log in to see your chats.</p>;

  return (
    <MainLayout>
      <div className="flex h-[80vh] p-4 max-w-full">
        <div className="w-80 min-w-[16rem] max-w-xs border-r p-2 overflow-y-auto">
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
                      chat.id === selectedChatId ? 'bg-gray-800' : 'hover:bg-gray-900'
                    }`}
                    onClick={() => setSelectedChatId(chat.id)}
                  >
                    <p className="font-semibold">
                      Deal: {deals[chat.dealId]?.title ?? 'Loading deal...'}
                    </p>
                    <p className="text-sm">
                      Chat with: {users[otherUserId]?.name ?? 'Loading user...'}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {chat.lastMessage?.text ?? 'No messages yet'}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex-1 p-2 overflow-auto ml-4">
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