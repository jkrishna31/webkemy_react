export const months: {
  [key: string]: { label: string, value: string | number }
} = {
  jan: { label: "January", value: 0 },
  feb: { label: "February", value: 1 },
  mar: { label: "March", value: 2 },
  apr: { label: "April", value: 3 },
  may: { label: "May", value: 4 },
  jun: { label: "June", value: 5 },
  jul: { label: "July", value: 6 },
  aug: { label: "August", value: 7 },
  sep: { label: "September", value: 8 },
  oct: { label: "October", value: 9 },
  nov: { label: "November", value: 10 },
  dec: { label: "December", value: 11 },
};

export const monthsOrder = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export const weekDays: {
  [key: string]: { label: string, value: string | number }
} = {
  mo: { label: "Monday", value: 0 },
  tu: { label: "Tuesday", value: 1 },
  we: { label: "Wednesday", value: 2 },
  th: { label: "Thursday", value: 3 },
  fr: { label: "Friday", value: 4 },
  sa: { label: "Saturday", value: 5 },
  su: { label: "Sunday", value: 6 },
};

export const weekDaysOrder = ["su", "mo", "tu", "we", "th", "fr", "sa"];
