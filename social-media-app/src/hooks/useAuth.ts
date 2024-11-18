import { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";
import { User as FirebaseUser, onAuthStateChanged, signOut } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { user, loading, logout };
};

export default useAuth;
