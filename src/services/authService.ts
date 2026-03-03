import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile, // UUSI IMPORT
} from "firebase/auth";
import { auth } from "../systems/firebase";

export const authService = {
  async register(email: string, password: string): Promise<string> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user.uid;
    } catch (error) {
      console.error("Firebase Auth error during registration:", error);
      throw new Error("Registration failed. Email might already be in use.");
    }
  },

  async login(email: string, password: string): Promise<string> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user.uid;
    } catch (error) {
      console.error("Firebase Auth error during login:", error);
      throw new Error("Login failed. Check your email and password.");
    }
  },

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Firebase Auth error during logout:", error);
      throw new Error("Logout failed.");
    }
  },

  // UUSI FUNKTIO: Päivittää kirjautuneen käyttäjän profiilin (esim. nimen)
  async updateUserProfile(displayName: string): Promise<void> {
    try {
      if (!auth.currentUser) throw new Error("No user logged in");
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error("Failed to update profile.");
    }
  },
};
