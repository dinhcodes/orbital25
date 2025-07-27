import Link from "next/link";
import { useAuth } from '@/components/authContext'; // adjust path as needed
import { useEffect, useState } from 'react';
import { BookmarkIcon as SolidBookmarkIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon as OutlineBookmarkIcon } from '@heroicons/react/24/outline';

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categories: string[];
  validUntil: string;
}

interface Props {
  posts: Post[];
}

export default function PostRow({ posts }: Props) {

  const { user, toggleBookmark, getBookmarks } = useAuth();
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (user) {
        const bookmarks = await getBookmarks();
        setBookmarkedIds(bookmarks);
      }
    };
    fetchBookmarks();
  }, [user]);

  const handleBookmark = async (postId: string) => {
    await toggleBookmark(postId);
    const updated = await getBookmarks();
    setBookmarkedIds(updated);
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  return (
    <div className="p-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
      {posts.map((post) => {
        const isBookmarked = bookmarkedIds.includes(post.id);

        return (
          <div
            key={post.id}
            className="relative bg-black border border-gray-600 shadow rounded-lg overflow-hidden"
          >
            <button
              onClick={() => handleBookmark(post.id)}
              className="absolute bottom-2 right-2 z-10 p-1 bg-black"
            >
              {isBookmarked ? (
                <SolidBookmarkIcon className="w-5 h-5 text-white-400" />
              ) : (
                <OutlineBookmarkIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>

            <Link href={`/deal/${post.id}`}>
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-orange-600 pb-2">
                  {post.categories.join(', ')}
                </p>
                <h2 className="text-lg font-semibold pb-2">{post.title}</h2>
                <p className="text-gray-400">Expires {formatDate(post.validUntil)}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}