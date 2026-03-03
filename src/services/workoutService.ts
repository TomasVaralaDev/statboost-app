import {
  collection,
  addDoc,
  query,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../systems/firebase";
// Tuodaan Exercise-tyyppi any-tyypin korvaamiseksi
import type { Workout, Exercise } from "../types/workout";

export const workoutService = {
  getUserWorkoutsRef(userId: string) {
    return collection(db, "users", userId, "workouts");
  },

  async getUserWorkouts(userId: string): Promise<Workout[]> {
    try {
      const q = query(this.getUserWorkoutsRef(userId), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return {
          id: docSnapshot.id,
          userId: userId,
          name: data.name,
          date: data.date.toDate(),
          exercises: data.exercises,
        } as Workout;
      });
    } catch (error) {
      console.error("Error fetching workouts:", error);
      throw new Error("Failed to load workouts.");
    }
  },

  async getWorkout(userId: string, workoutId: string): Promise<Workout | null> {
    try {
      const docRef = doc(db, "users", userId, "workouts", workoutId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;

      const data = docSnap.data();
      return {
        id: docSnap.id,
        userId: userId,
        name: data.name,
        date: data.date.toDate(),
        exercises: data.exercises,
      } as Workout;
    } catch (error) {
      console.error("Error fetching single workout:", error);
      throw new Error("Failed to load workout details.");
    }
  },

  async createWorkout(workout: Workout): Promise<string> {
    try {
      const docRef = await addDoc(this.getUserWorkoutsRef(workout.userId), {
        name: workout.name,
        date: Timestamp.fromDate(workout.date),
        exercises: workout.exercises,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating workout:", error);
      throw new Error("Failed to save workout.");
    }
  },

  async updateWorkout(
    userId: string,
    workoutId: string,
    workoutData: Omit<Workout, "id" | "userId">,
  ): Promise<void> {
    try {
      const docRef = doc(db, "users", userId, "workouts", workoutId);
      await updateDoc(docRef, {
        name: workoutData.name,
        date: Timestamp.fromDate(workoutData.date),
        exercises: workoutData.exercises,
      });
    } catch (error) {
      console.error("Error updating workout:", error);
      throw new Error("Failed to update workout.");
    }
  },

  async deleteWorkout(userId: string, workoutId: string): Promise<void> {
    try {
      const docRef = doc(db, "users", userId, "workouts", workoutId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting workout:", error);
      throw new Error("Failed to delete workout.");
    }
  },

  // KORJATTU: any[] korvattu Exercise[]-tyypillä
  async createTemplate(
    userId: string,
    templateData: { name: string; exercises: Exercise[] },
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "users", userId, "programs"), {
        ...templateData,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating template:", error);
      throw new Error("Failed to save template.");
    }
  },
};
