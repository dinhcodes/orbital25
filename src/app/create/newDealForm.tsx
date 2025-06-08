'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/clientApp'; // your firestore instance

export default function AddVoucherForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState('');
  const [validUntil, setvalidUntil] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dealData = {
      title,
      description,
      imageUrl,
      categories: categories.split(',').map((c) => c.trim()), // convert to array,
      validUntil,
    };

    try {
      await addDoc(collection(db, 'Deals'), dealData);
      alert('Voucher added!');
      setTitle('');
      setDescription('');
      setImageUrl('');
      setCategories('');
      setvalidUntil('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Categories (comma-separated)"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Expiry Date (Example: 'Exp. 8 June')"
        value={validUntil}
        onChange={(e) => setvalidUntil(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Voucher
      </button>
    </form>
  );
}