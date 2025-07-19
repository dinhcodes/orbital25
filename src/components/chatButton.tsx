'use client';

import { useRouter } from 'next/navigation';
import { getOrCreateChat } from './chatRedirect';
import { useAuth } from './authContext';

interface Props {
  dealId: string;
  sellerId: string;
}

export default function ChatButton({ dealId, sellerId }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  const handleChat = async () => {
    if (!user) {
      alert('You must be logged in to chat.');
      return;
    }

    const chatId = await getOrCreateChat(user.uid, sellerId, dealId);
    router.push(`/chats?open=${chatId}`);
  };

  return (
    <button
      onClick={handleChat}
      className="w-full bg-gray-400 rounded border-white py-2 font-semibold hover:bg-gray-500 transition"
    >
      Chat
    </button>
  );
}