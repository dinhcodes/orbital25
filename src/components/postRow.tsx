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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-black border border-gray-600 shadow rounded-lg overflow-hidden"
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <p className="text-orange-600 pb-2">{post.categories}</p>
            <h2 className="text-lg font-semibold pb-2">{post.title}</h2>
            <p className="text-gray-400">{post.validUntil}</p>
          </div>
        </div>
      ))}
    </div>
  );
}