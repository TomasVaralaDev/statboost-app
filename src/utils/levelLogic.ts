export const calculateLevel = (totalVolume: number) => {
  // Esimerkkikaava: Taso = neliöjuuri (volyymi / 500)
  // Taso 1 = 500kg, Taso 2 = 2000kg, Taso 3 = 4500kg jne.
  const level = Math.floor(Math.sqrt(totalVolume / 500)) || 1;

  const currentLevelXp = Math.pow(level, 2) * 500;
  const nextLevelXp = Math.pow(level + 1, 2) * 500;
  const progress =
    ((totalVolume - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;

  return { level, progress: Math.max(0, Math.min(100, progress)), nextLevelXp };
};
