export const formatTime = (dateStr: string): string => {
  const date = new Date(dateStr);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  const formattedDate = `${day} ${month} ${year} at ${hours}:${minutes}`;
  return formattedDate;
};
