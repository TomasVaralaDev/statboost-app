export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  exercises: string[];
}

export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  templates: WorkoutTemplate[];
}

export const trainingPrograms: TrainingProgram[] = [
  {
    id: "ppl-classic",
    name: "Classic PPL",
    description: "Push, Pull, Legs split for balanced growth.",
    templates: [
      {
        id: "push-day",
        name: "Push Day",
        description: "Chest, Shoulders & Triceps",
        exercises: [
          "Bench Press",
          "Overhead Press",
          "Incline Dumbbell Press",
          "Tricep Pushdown",
        ],
      },
      {
        id: "pull-day",
        name: "Pull Day",
        description: "Back, Biceps & Rear Delts",
        exercises: ["Deadlift", "Pull-ups", "Barbell Row", "Bicep Curls"],
      },
      {
        id: "leg-day",
        name: "Leg Day",
        description: "Quads, Hamstrings & Calves",
        exercises: ["Squat", "Leg Press", "Romanian Deadlift", "Calf Raises"],
      },
    ],
  },
  {
    id: "arnold-split",
    name: "Arnold Split",
    description: "The legendary Chest/Back, Shoulders/Arms, Legs split.",
    templates: [
      {
        id: "chest-back",
        name: "Chest & Back",
        description: "Focus on the torso",
        exercises: [
          "Bench Press",
          "Bent Over Row",
          "Incline Press",
          "Lat Pulldown",
        ],
      },
      {
        id: "shoulders-arms",
        name: "Shoulders & Arms",
        description: "Focus on upper body detail",
        exercises: [
          "Military Press",
          "Lateral Raises",
          "Barbell Curls",
          "Dumbbell Extensions",
        ],
      },
      {
        id: "legs-arnold",
        name: "Legs Day",
        description: "Heavy compound leg work",
        exercises: [
          "Squat",
          "Leg Extension",
          "Stiff Leg Deadlift",
          "Calf Raises",
        ],
      },
    ],
  },
  {
    id: "full-body-program",
    name: "Full Body",
    description: "Hit every muscle group in a single session.",
    templates: [
      {
        id: "full-body-a",
        name: "Full Body A",
        description: "Squat & Bench focus",
        exercises: ["Squat", "Bench Press", "Barbell Row", "Plank"],
      },
      {
        id: "full-body-b",
        name: "Full Body B",
        description: "Deadlift & OHP focus",
        exercises: ["Deadlift", "Overhead Press", "Pull-ups", "Leg Raises"],
      },
    ],
  },
];
