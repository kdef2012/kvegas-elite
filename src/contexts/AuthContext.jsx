import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('kvegas_admin_session') === 'true';
  });
  
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('kvegas_admin_session') === 'true' 
      ? { uid: 'admin_bypass', email: 'coach@kvegaselite.com' } 
      : null;
  });

  const [userProfile, setUserProfile] = useState(() => {
    return localStorage.getItem('kvegas_admin_session') === 'true'
      ? { isPremium: true, membership: 'elite', name: 'Coach Nelson', role: 'admin' }
      : null;
  });
  
  const [loading, setLoading] = useState(true);

  // Admin backdoor login (0610)
  const loginAsAdmin = async () => {
    try {
      await signInWithEmailAndPassword(auth, 'coach@kvegaselite.com', '061000');
      setIsAdmin(true);
      localStorage.setItem('kvegas_admin_session', 'true');
      return true;
    } catch (error) {
      console.error("Admin login failed:", error);
      throw error;
    }
  };

  const signup = async (email, password, additionalData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create free user profile in Firestore
    const profileData = {
      uid: user.uid,
      email: email,
      isPremium: false,
      membership: 'none',
      role: 'athlete', // Core routing role
      medals: { gold: 0, silver: 0, bronze: 0 },
      createdAt: new Date(),
      ...additionalData
    };
    
    await setDoc(doc(db, 'users', user.uid), profileData);
    setUserProfile(profileData);
    return userCredential;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('kvegas_admin_session');
    setUserProfile(null);
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (isAdmin) {
        setCurrentUser({ uid: 'admin_bypass', email: 'coach@kvegaselite.com' });
        setUserProfile({ isPremium: true, membership: 'elite', name: 'Coach Nelson', role: 'admin' });
      } else {
        setCurrentUser(user);
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
          } else {
            setUserProfile(null);
          }
        } else {
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [isAdmin]);

  const value = {
    currentUser,
    userProfile,
    isAdmin,
    loginAsAdmin,
    signup,
    login,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
