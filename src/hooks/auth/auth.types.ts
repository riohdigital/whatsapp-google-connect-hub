
export type User = {
  id: string;
  email: string;
  role: 'admin' | 'user';
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  googleConnected: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  connectGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};
