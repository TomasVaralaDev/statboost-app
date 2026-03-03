export interface WorkoutSet {
  id: string;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id?: string;
  userId: string;
  name: string;
  date: Date;
  exercises: Exercise[];
}
