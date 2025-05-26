'use client';

import { useAuth } from '../components/authContext';

export default function Login() {
  const { user, signIn, logOut } = useAuth();

  return (
    <div className="p-4 border-b bg-white text-black flex justify-between">
      {user ? (
        <>
          <span>Hello, {user.displayName}</span>
          <button onClick={logOut}>Log out</button>
        </>
      ) : (
        <button onClick={signIn}>Log in with Google</button>
      )}
    </div>
  );
}