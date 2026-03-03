export interface PlateBreakdown {
  plates: { weight: number; count: number }[];
  remainder: number;
}

export const calculatePlates = (
  targetWeight: number,
  barWeight: number = 20,
  availablePlates: number[] = [25, 20, 15, 10, 5, 2.5, 1.25],
): PlateBreakdown => {
  let weightPerSide = (targetWeight - barWeight) / 2;
  const breakdown: { weight: number; count: number }[] = [];

  if (weightPerSide <= 0) return { plates: [], remainder: 0 };

  const sortedPlates = [...availablePlates].sort((a, b) => b - a);

  for (const plate of sortedPlates) {
    const count = Math.floor(weightPerSide / plate);
    if (count > 0) {
      breakdown.push({ weight: plate, count });
      weightPerSide -= count * plate;
    }
  }

  return {
    plates: breakdown,
    remainder: weightPerSide * 2,
  };
};
