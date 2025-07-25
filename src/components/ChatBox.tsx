'use client';

import { useAuth } from './authContext';
import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebase/clientApp';
import { doc, updateDoc } from "firebase/firestore";

interface ChatBoxProps {
  chatId: string;
}

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Timestamp | null;
}

export default function ChatBox({ chatId }: ChatBoxProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!chatId) return;

    const messagesQuery = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const loadedMessages = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...(doc.data() as Omit<Message, 'id'>) })
      );
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user?.uid || !chatId) return;

    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      text: newMessage.trim(),
      senderId: user.uid,
      timestamp: serverTimestamp(),
    });

    // Update the chat document's lastMessage
    const chatDocRef = doc(db, 'chats', chatId);
    await updateDoc(chatDocRef, {
      lastMessage: {
        text: newMessage.trim(),
        timestamp: serverTimestamp(),
      },
    });

    setNewMessage('');
  };

  return (
    <div className="mt-8 p-4 bg-gray-900">
      <h2 className="font-bold text-xl mb-2">Chat</h2>
      <div className="max-h-60 overflow-y-auto mb-4 space-y-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === user?.uid ? 'justify-end' : 'justify-start'
            }`}
          >
            <span className="bg-gray-700 text-white p-2 rounded max-w-xs break-words">
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 rounded text-black"
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}