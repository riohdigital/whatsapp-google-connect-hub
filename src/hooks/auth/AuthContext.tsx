
import { createContext } from 'react';
import { User } from './auth.types';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  googleConnected: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  connectGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
