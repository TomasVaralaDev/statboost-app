import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react"; // <-- Korjattu: tuodaan ReactNode tyyppinä
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../systems/firebase";
import type { AppUser } from "../types/auth"; // <-- Korjattu: tuodaan AppUser tyyppinä

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
}

// Poistetaan Viten Fast Refresh -varoitus tästä nimenomaisesta viennistä,
// sillä Contextin ja Providerin pitäminen samassa tiedostossa on SOLID-hengen
// mukaista (korkea koheesio tälle yhdelle vastuulle).
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kuunnellaan Firebasen auth-tilan muutoksia
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Siivotaan kuuntelija, kun komponentti poistuu
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
