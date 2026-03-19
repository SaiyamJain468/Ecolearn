import { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // LOGIN BYPASS: auto-set a fake admin user for demo
    const bypassUser = {
      id: 1,
      name: 'Admin',
      email: 'admin@ecolearn.com',
      role: 'admin',
      eco_points_total: 9999,
    };
    localStorage.setItem('token', 'bypass-token');
    localStorage.setItem('user', JSON.stringify(bypassUser));
    setUser(bypassUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await client.post('/auth/login/', { email, password });
      const { access, user: userProfile } = response.data;
      
      localStorage.setItem('token', access);
      localStorage.setItem('user', JSON.stringify(userProfile));
      setUser(userProfile);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
