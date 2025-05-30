import Link from 'next/link';

export default function Header() {
    return (
      <header className="flex items-center p-6 bg-black-500 border-b border-gray-700 text-white header">
        <h1 className="text-xl font-bold" id='title'>Dealio</h1>
        <Link className="ml-auto" href="/profile">
          <button className="bg-blue-500 text-white px-4 py-2 rounded headerLink">
            Profile
          </button>
        </Link>
      </header>
    );
  }