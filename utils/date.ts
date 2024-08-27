export const formatDate = (date: string, withTime: boolean = false) => {
  // Convert the string to a Date object
  const dateObj = new Date(date);

  // Extract the day, month, year, hours, minutes, and seconds
  const day = String(dateObj.getUTCDate()).padStart(2, '0');
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
  const year = dateObj.getUTCFullYear();
  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');

  if (withTime) {
    // Format the date and time according to the desired format
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  // Format the date to the desired format
  return `${day}-${month}-${year}`;
};
