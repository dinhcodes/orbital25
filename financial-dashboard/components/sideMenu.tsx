import Link from "next/link";

export default function SideMenu() {
    return (
      <nav className="w-16 h-screen bg-black text-white p-4 border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-6">
          <Link href="/">
            <svg height="32" width="32">
                <image height="32" width="32" href="/icon.jpg" />
                </svg>
                </Link>
        </h2>
        <ul className="space-y-4">
          <li><a href="/test" className="hover:text-gray-400">a</a></li>
          <li><a href="/about" className="hover:text-gray-400">b</a></li>
          <li><a href="/contact" className="hover:text-gray-400">c</a></li>
        </ul>
      </nav>
    );
  }