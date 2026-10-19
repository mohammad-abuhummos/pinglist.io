import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, storeToken } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api
      .me()
      .then((data) => {
        if (!cancelled) setUser(data.user || null);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      async register(payload) {
        const data = await api.register(payload);
        storeToken(data.token);
        setUser(data.user);
        return data.user;
      },
      async login(payload) {
        const data = await api.login(payload);
        storeToken(data.token);
        setUser(data.user);
        return data.user;
      },
      async logout() {
        try {
          await api.logout();
        } catch {
          /* still clear local session */
        }
        storeToken(null);
        setUser(null);
      },
    }),
    [user, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
