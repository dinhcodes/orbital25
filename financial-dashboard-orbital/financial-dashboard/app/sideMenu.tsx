export default function SideMenu() {
    return (
      <nav className="w-16 h-screen bg-black text-white p-6 border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          <li><a href="/" className="hover:text-gray-400">a</a></li>
          <li><a href="/about" className="hover:text-gray-400">b</a></li>
          <li><a href="/contact" className="hover:text-gray-400">c</a></li>
        </ul>
      </nav>
    );
  }