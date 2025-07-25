export const formatUtcOffset = (seconds: number) => {
  const hours = seconds / 3600;
  const sign = hours >= 0 ? "+" : "-";
  return `UTC${sign}${Math.abs(hours)}`;
};
