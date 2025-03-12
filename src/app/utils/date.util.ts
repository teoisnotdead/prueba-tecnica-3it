export const getPastDate = (
  daysAgo: number
): { year: number; month: number; day: number } => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - daysAgo);

  return {
    year: pastDate.getFullYear(),
    month: pastDate.getMonth() + 1,
    day: pastDate.getDate(),
  };
};
