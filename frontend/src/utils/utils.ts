/**
 * Extracts initials from a full name.
 *
 * This function returns a string composed of the first letter of each name part.
 *
 * @param name - The full name of the user.
 * @returns A string containing the uppercase initials.
 *
 * @example
 * getInitials("Fábio Rodrigues") // "FR"
 */
export const getInitials = (name: string): string =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

export const formatTimestamp = (date: Date): string => {
  const datePart = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

  const timePart = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  return `${datePart} – ${timePart}`;
};
