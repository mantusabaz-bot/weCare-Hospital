import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  phoneVerified: boolean;
  createdAt: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  phoneVerifiedSession: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name: string, phone: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  sendOtp: (phone: string) => Promise<{ success: boolean; maskedPhone?: string; message?: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
  logout: () => Promise<void>;
  markPhoneVerified: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [phoneVerifiedSession, setPhoneVerifiedSession] = useState<boolean>(() => {
    return sessionStorage.getItem('wecare_phone_verified') === 'true';
  });

  // Track Firebase user changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data() as UserProfile;
            setUserProfile(data);
            if (data.phoneVerified) {
              setPhoneVerifiedSession(true);
              sessionStorage.setItem('wecare_phone_verified', 'true');
            }
          } else {
            // Initialize basic profile
            const newProfile: UserProfile = {
              userId: user.uid,
              email: user.email || '',
              displayName: user.displayName || user.email?.split('@')[0] || 'Patient',
              phoneNumber: user.phoneNumber || '',
              phoneVerified: false,
              createdAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, newProfile);
            setUserProfile(newProfile);
          }
        } catch (err) {
          console.warn('Could not fetch user document from Firestore:', err);
          // Set local fallback profile
          setUserProfile({
            userId: user.uid,
            email: user.email || '',
            displayName: user.displayName || 'Patient User',
            phoneNumber: '',
            phoneVerified: false,
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        setUserProfile(null);
        setPhoneVerifiedSession(false);
        sessionStorage.removeItem('wecare_phone_verified');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    // If the user's phone is not yet verified in session, phone verification step will be triggered
  };

  const signUp = async (email: string, pass: string, name: string, phone: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (cred.user) {
      await updateProfile(cred.user, { displayName: name });
      const userDocRef = doc(db, 'users', cred.user.uid);
      const newProfile: UserProfile = {
        userId: cred.user.uid,
        email,
        displayName: name,
        phoneNumber: phone,
        phoneVerified: false,
        createdAt: new Date().toISOString(),
      };
      await setDoc(userDocRef, newProfile);
      setUserProfile(newProfile);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const sendOtp = async (phone: string) => {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to send OTP code.');
    }
    return data;
  };

  const verifyOtp = async (phone: string, otp: string) => {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Invalid verification OTP.');
    }
    if (data.verified) {
      setPhoneVerifiedSession(true);
      sessionStorage.setItem('wecare_phone_verified', 'true');
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          await setDoc(userDocRef, { phoneVerified: true, phoneNumber: phone }, { merge: true });
        } catch (e) {
          console.warn('Could not update phone verification flag in Firestore:', e);
        }
      }
      return true;
    }
    return false;
  };

  const markPhoneVerified = () => {
    setPhoneVerifiedSession(true);
    sessionStorage.setItem('wecare_phone_verified', 'true');
  };

  const logout = async () => {
    await signOut(auth);
    setPhoneVerifiedSession(false);
    sessionStorage.removeItem('wecare_phone_verified');
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        phoneVerifiedSession,
        signIn,
        signUp,
        signInWithGoogle,
        sendPasswordReset,
        sendOtp,
        verifyOtp,
        logout,
        markPhoneVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
