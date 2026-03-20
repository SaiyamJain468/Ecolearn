import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_ADMIN, MOCK_SAIYAM } from '../lib/mockData';

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Auto-login for prototype convenience
      localStorage.setItem('token', 'proto-token-99');
      localStorage.setItem('user', JSON.stringify(MOCK_ADMIN));
      setUser(MOCK_ADMIN);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    
    let userToSet = MOCK_SAIYAM; // Default
    if (email.toLowerCase().includes('admin')) {
      userToSet = MOCK_ADMIN;
    }

    localStorage.setItem('token', 'proto-token-99');
    localStorage.setItem('user', JSON.stringify(userToSet));
    setUser(userToSet);
    return true;
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
