import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../lib/firebase";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Map to our app's expected user structure
        setUser({
          id: currentUser.uid,
          name: currentUser.displayName || currentUser.email.split('@')[0],
          email: currentUser.email,
          role: currentUser.email.toLowerCase().includes("admin") ? "Admin" : "Member",
          avatar: currentUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.uid}`,
          xp: 1250, // default placeholder
          level: 5,
          rank: "Eco Pioneer",
          joinDate: "2026-03-20"
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email, password, name) => {
    // In a full app, we update the profile with the name. Here we just create the auth record.
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    sessionStorage.removeItem("ecolearn_completed_missions");
    sessionStorage.removeItem("ecolearn_completed_lessons");
    sessionStorage.removeItem("ecolearn_submissions");
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
