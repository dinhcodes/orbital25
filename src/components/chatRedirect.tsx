import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/firebase/clientApp'

export async function getOrCreateChat(currentUserId: string, recipientId: string, dealId: string) {
  const participantsKey = [currentUserId, recipientId].sort().join('_');
  const chatId = `${participantsKey}_${dealId}`;

  const chatRef = collection(db, 'chats');
  const q = query(chatRef, where('chatId', '==', chatId));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) return snapshot.docs[0].id;

  const docRef = await addDoc(chatRef, {
    chatId,
    participants: [currentUserId, recipientId],
    dealId,
    lastMessage: null,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}