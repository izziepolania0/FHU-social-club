// context/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refresh: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const me = await account.get();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
