import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('projectnest_token'));
  const [user, setUser] = useState(() => {
    try {
      return token ? jwtDecode(token) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('projectnest_token', token);
      try {
        setUser(jwtDecode(token));
      } catch {
        setUser(null);
      }
    } else {
      localStorage.removeItem('projectnest_token');
      setUser(null);
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    const response = await api.post('/auth/login', credentials);
    const data = response.data;
    setToken(data.token);
    setLoading(false);
    return data;
  };

  const register = async (payload) => {
    setLoading(true);
    const response = await api.post('/auth/register', payload);
    const data = response.data;
    setToken(data.token);
    setLoading(false);
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, loading, isAuthenticated: Boolean(token), login, register, logout }), [token, user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
