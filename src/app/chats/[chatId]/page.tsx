'use client';

import { useParams } from 'next/navigation';
import ChatBox from '@/components/ChatBox';

export default function ChatPage() {
  const { chatId } = useParams();

  if (!chatId || typeof chatId !== 'string') {
    return <p>Loading chat...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <ChatBox chatId={chatId} />
    </div>
  );
}