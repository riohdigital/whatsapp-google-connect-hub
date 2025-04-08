
export type User = {
  id: string;
  email: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
};

export type UserPlan = {
  planName: string;
  expiresAt: Date | null;
};

export type AuthContextType = {
  user: User | null;
  userPlan: UserPlan | null;
  loading: boolean;
  googleConnected: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  connectGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (firstName: string, lastName: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
};
