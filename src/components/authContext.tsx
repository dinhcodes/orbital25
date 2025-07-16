'use client';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/clientApp';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';

import { auth } from '../firebase/clientApp';

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  toggleBookmark: (postId: string) => Promise<void>;
  getBookmarks: () => Promise<string[]>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const toggleBookmark = async (postId: string) => {
  if (!user) return;
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, { bookmarks: [postId] });
  } else {
    const bookmarks: string[] = userSnap.data().bookmarks || [];
    if (bookmarks.includes(postId)) {
      await updateDoc(userRef, {
        bookmarks: arrayRemove(postId),
      });
    } else {
      await updateDoc(userRef, {
        bookmarks: arrayUnion(postId),
      });
    }
  }
};

const getBookmarks = async (): Promise<string[]> => {
  if (!user) return [];
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data().bookmarks || [] : [];
};

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signUpWithEmail,
        loginWithEmail,
        logOut,
        toggleBookmark,
        getBookmarks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}