export const monthMap: { [key: string]: number } = {
  январь: 0,
  февраль: 1,
  март: 2,
  апрель: 3,
  май: 4,
  июнь: 5,
  июль: 6,
  август: 7,
  сентябрь: 8,
  октябрь: 9,
  ноябрь: 10,
  декабрь: 11,
};

export const formatDate = (date: string | Date, withTime: boolean = false) => {
  // Convert the string to a Date object
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Extract the day, month, year, hours, minutes, and seconds
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  if (withTime) {
    // Format the date and time according to the desired format
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  // Format the date to the desired format
  return `${day}-${month}-${year}`;
};

export const formatMonthName = (monthNumber: number) => {
  return Object.keys(monthMap).find(key => monthMap[key] === monthNumber);
};
