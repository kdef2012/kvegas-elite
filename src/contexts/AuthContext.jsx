import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Admin backdoor login (0610)
  const loginAsAdmin = () => {
    setIsAdmin(true);
    setCurrentUser({ uid: 'admin_bypass', email: 'coach@kvegaselite.com' });
    setUserProfile({ isPremium: true, membership: 'elite', name: 'Coach Nelson', role: 'admin' });
  };

  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create free user profile in Firestore
    const profileData = {
      uid: user.uid,
      name: name,
      email: email,
      isPremium: false,
      membership: 'none',
      role: 'athlete',
      medals: { gold: 0, silver: 0, bronze: 0 },
      createdAt: new Date()
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
    setUserProfile(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isAdmin) {
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
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
