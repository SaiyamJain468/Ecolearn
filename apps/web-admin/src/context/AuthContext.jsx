import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const MOCK_ADMIN = {
  id: 1,
  name: 'Gaia Admin',
  email: 'admin@ecolearn.in',
  role: 'admin',
  eco_points_total: 12500,
};

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
    
    localStorage.setItem('token', 'proto-token-99');
    localStorage.setItem('user', JSON.stringify(MOCK_ADMIN));
    setUser(MOCK_ADMIN);
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
