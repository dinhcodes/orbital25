import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function SideMenu() {
  const pathname = usePathname();
  const homeIsActive = pathname === '/'; // Check if currently on home page
  const bookmarkIsActive = pathname === '/bookmarks'; // Check if currently on bookmark page, currently no bookmark page TODO: Implement bookmark page
  const profileIsActive = pathname === '/profile'; // Check if currently on profile page
    return (
      <nav className="w-16 h-screen bg-black text-white p-3 border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-16">
          <Link href="/">
            <svg height="40" width="40">
                <image height="40" width="40" href="/icon.jpg" />
                </svg>
                </Link>
        </h2>
        <ul className="space-y-10">
          <li>
            <Link className={`ml-auto ${homeIsActive ? 'text-blue-600 shadow-glow' : 'text-white hover:text-blue-400'}`} href="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </Link>
          </li>
          <li>
            <Link className={`ml-auto ${bookmarkIsActive ? 'text-blue-600 shadow-glow' : 'text-white hover:text-blue-400'}`} href="/bookmarks">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
            </Link>
          </li>
          <li>
            <Link className={`ml-auto ${profileIsActive ? 'text-blue-600 shadow-glow' : 'text-white hover:text-blue-400'}`} href="/profile">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }