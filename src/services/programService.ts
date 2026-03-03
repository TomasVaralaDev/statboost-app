import {
  collection,
  addDoc,
  query,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../systems/firebase";
import { type TrainingProgram } from "../data/workoutTemplates";

export const programService = {
  // Apufunktio polulle: users/{userId}/programs/
  getUserProgramsRef(userId: string) {
    return collection(db, "users", userId, "programs");
  },

  async createProgram(
    userId: string,
    program: Omit<TrainingProgram, "id">,
  ): Promise<string> {
    try {
      const docRef = await addDoc(this.getUserProgramsRef(userId), {
        ...program,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating program:", error);
      throw new Error("Failed to save custom program.");
    }
  },

  async getUserPrograms(userId: string): Promise<TrainingProgram[]> {
    try {
      const q = query(this.getUserProgramsRef(userId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      })) as TrainingProgram[];
    } catch (error) {
      console.error("Error fetching programs:", error);
      return [];
    }
  },
};
