import Link from 'next/link';

export default function Header() {
    return (
      <header className="flex items-center p-4 bg-black-500 border-b border-gray-700 text-white header">
        <h1 className="text-xl font-bold" id='title'><Link href="/">Dealio</Link></h1>
      </header>
    );
  }