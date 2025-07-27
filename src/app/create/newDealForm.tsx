'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/clientApp'; // firestore instance
import { useAuth } from '../../components/authContext';

export default function AddVoucherForm() {
  const { user } = useAuth();
  const categoryList = [
    "Electronics", 
    "Food & Beverages", 
    "Graphic Design", 
    "Groceries",
    "Clothing & Apparel",
    "Home & Kitchen",
    "Sports",
    "Travel",
  ];
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState('');
  const [validUntil, setvalidUntil] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to add a voucher.');
      return;
    }

    const dealData = {
      title,
      description,
      imageUrl,
      categories: categories.split(',').map((c) => c.trim()), // convert to array,
      validUntil,
      createdBy: user.uid,
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
        placeholder="Title (Max 100 Chars)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-black border p-2 rounded"
        maxLength={100}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full text-black border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full text-black border p-2 rounded"
      />

      <select 
        required
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        className="w-full text-black border p-2 rounded">

        <option value="" disabled hidden>
          -- Select a Category --
        </option>
      
        {categoryList.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}

      </select>

      <input
        type="date"
        placeholder="Expiry Date (Example: 'Exp. 8 June')"
        value={validUntil}
        onChange={(e) => setvalidUntil(e.target.value)}
        className="w-full text-black border p-2 rounded"
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