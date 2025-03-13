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

export function getLast12Months(): {
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
} {
  const today = new Date();
  const pastYear = new Date(today);
  pastYear.setFullYear(today.getFullYear() - 1);

  return {
    startYear: pastYear.getFullYear(),
    startMonth: pastYear.getMonth() + 1,
    endYear: today.getFullYear(),
    endMonth: today.getMonth() + 1,
  };
}
