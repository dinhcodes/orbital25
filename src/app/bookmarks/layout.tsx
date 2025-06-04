'use client';

import { AuthProvider } from "../../components/authContext";
import Login from "../../components/login";
import MainLayout from '../../components/mainLayout';

export default function BookmarksLayout() {
  return (
    <MainLayout>
      <div className="p-16">
              <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Your Bookmarks</h1>
                <p className="text-gray-600">Bookmarked entries will appear here.</p>
              </div>
      </div>
    </MainLayout>
  );
}