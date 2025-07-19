import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function SideMenu() {
  const pathname = usePathname();
  const homeIsActive = pathname === '/'; // Check if currently on home page
  const newPostIsActive = pathname === '/create'; // Check if currently on profile page
  const bookmarkIsActive = pathname === '/bookmarks'; // Check if currently on bookmark page, currently no bookmark page TODO: Implement bookmark page
  const profileIsActive = pathname === '/profile'; // Check if currently on profile page
  const chatIsActive = pathname === '/chats'; // Check if currently on chat page
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
            <Link className={`ml-auto ${newPostIsActive ? 'text-blue-600 shadow-glow' : 'text-white hover:text-blue-400'}`} href="/create">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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
          <li>
            <Link className={`ml-auto ${chatIsActive ? 'text-blue-600 shadow-glow' : 'text-white hover:text-blue-400'}`} href="/chats">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }